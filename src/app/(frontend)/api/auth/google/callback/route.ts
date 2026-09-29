import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { generatePayloadCookie } from 'payload/shared'
import config from '@payload-config'
import crypto from 'crypto'
import { GOOGLE_STATE_COOKIE, getGoogleRedirectUri } from '../route'

type GoogleTokenResponse = {
  access_token?: string
  error?: string
}

type GoogleProfile = {
  sub: string
  email?: string
  email_verified?: boolean
  given_name?: string
  family_name?: string
  name?: string
}

const redirectWithError = (request: NextRequest, reason: string) => {
  const response = NextResponse.redirect(new URL(`/login?error=${reason}`, request.url))
  response.cookies.delete(GOOGLE_STATE_COOKIE)
  return response
}

// Finishes the Google OAuth flow: verifies the CSRF state, exchanges the
// authorization code for a profile, finds-or-creates the matching customer,
// and issues Payload's own session cookie for that customer.
export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl

  if (searchParams.get('error')) {
    return redirectWithError(request, 'google_denied')
  }

  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const storedState = request.cookies.get(GOOGLE_STATE_COOKIE)?.value

  if (!code || !state || !storedState || state !== storedState) {
    return redirectWithError(request, 'invalid_state')
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return redirectWithError(request, 'google_not_configured')
  }

  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: getGoogleRedirectUri(request),
        grant_type: 'authorization_code',
      }),
    })

    const tokenData = (await tokenRes.json()) as GoogleTokenResponse

    if (!tokenRes.ok || !tokenData.access_token) {
      return redirectWithError(request, 'google_token_exchange_failed')
    }

    const profileRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })

    if (!profileRes.ok) {
      return redirectWithError(request, 'google_profile_failed')
    }

    const profile = (await profileRes.json()) as GoogleProfile

    if (!profile.email || !profile.email_verified) {
      return redirectWithError(request, 'google_email_unverified')
    }

    const email = profile.email.toLowerCase().trim()
    const payload = await getPayload({ config })

    const existing = await payload.find({
      collection: 'customers',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    })

    // Payload has no "log in without a password" primitive, so each Google
    // sign-in rotates the customer's password to a value only this request
    // knows, then immediately logs in with it through the normal login
    // operation (which is what actually creates the session/JWT).
    const sessionPassword = crypto.randomBytes(32).toString('hex')

    let customerId: number | string

    if (existing.docs.length > 0) {
      const customer = existing.docs[0]
      customerId = customer.id

      await payload.update({
        collection: 'customers',
        id: customerId,
        data: {
          password: sessionPassword,
          ...(customer.googleId ? {} : { googleId: profile.sub }),
        },
        overrideAccess: true,
      })
    } else {
      const created = await payload.create({
        collection: 'customers',
        data: {
          firstName: profile.given_name || profile.name || 'Cliente',
          lastName: profile.family_name || '',
          email,
          googleId: profile.sub,
          password: sessionPassword,
        },
        overrideAccess: true,
      })
      customerId = created.id
    }

    const { token } = await payload.login({
      collection: 'customers',
      data: { email, password: sessionPassword },
    })

    if (!token) {
      return redirectWithError(request, 'google_login_failed')
    }

    const cookie = generatePayloadCookie({
      collectionAuthConfig: payload.collections.customers.config.auth,
      cookiePrefix: payload.config.cookiePrefix,
      token,
    })

    const response = NextResponse.redirect(new URL('/account', request.url))
    response.headers.append('Set-Cookie', cookie)
    response.cookies.delete(GOOGLE_STATE_COOKIE)

    return response
  } catch (err) {
    console.error('GOOGLE_OAUTH_ERROR', err)
    return redirectWithError(request, 'google_login_failed')
  }
}
