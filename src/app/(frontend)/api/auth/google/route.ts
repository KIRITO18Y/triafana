import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export const GOOGLE_STATE_COOKIE = 'google_oauth_state'

export const getGoogleRedirectUri = (request: NextRequest) =>
  process.env.GOOGLE_REDIRECT_URI || new URL('/api/auth/google/callback', request.url).toString()

// Kicks off the "Sign in with Google" flow: sends the browser to Google's
// consent screen with a CSRF `state` token that the callback route verifies.
export const GET = async (request: NextRequest) => {
  const clientId = process.env.GOOGLE_CLIENT_ID

  if (!clientId) {
    return NextResponse.redirect(new URL('/login?error=google_not_configured', request.url))
  }

  const state = crypto.randomBytes(32).toString('hex')

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', getGoogleRedirectUri(request))
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('scope', 'openid email profile')
  authUrl.searchParams.set('state', state)
  authUrl.searchParams.set('access_type', 'online')
  authUrl.searchParams.set('prompt', 'select_account')

  const response = NextResponse.redirect(authUrl)

  response.cookies.set(GOOGLE_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 5,
    path: '/',
  })

  return response
}
