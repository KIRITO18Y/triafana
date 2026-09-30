import crypto from 'crypto'

export const getWompiPublicKey = () => {
  const key = process.env.WOMPI_PUBLIC_KEY

  if (!key) {
    throw new Error('WOMPI_PUBLIC_KEY no está configurada')
  }

  return key
}

const getIntegritySecret = () => {
  const secret = process.env.WOMPI_INTEGRITY_SECRET

  if (!secret) {
    throw new Error('WOMPI_INTEGRITY_SECRET no está configurada')
  }

  return secret
}

const getEventsSecret = () => {
  const secret = process.env.WOMPI_EVENTS_SECRET

  if (!secret) {
    throw new Error('WOMPI_EVENTS_SECRET no está configurada')
  }

  return secret
}

// https://docs.wompi.co — Web Checkout integrity signature:
// SHA256(reference + amountInCents + currency [+ expirationTime] + integritySecret)
export const buildIntegritySignature = ({
  reference,
  amountInCents,
  currency,
  expirationTime,
}: {
  reference: string
  amountInCents: number
  currency: string
  expirationTime?: string
}) => {
  const base = `${reference}${amountInCents}${currency}${expirationTime ?? ''}${getIntegritySecret()}`

  return crypto.createHash('sha256').update(base).digest('hex')
}

type WompiEventPayload = {
  data: Record<string, unknown>
  signature: { properties: string[]; checksum: string }
  timestamp: number
}

const getByPath = (obj: Record<string, unknown>, path: string): unknown =>
  path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key]
    }

    return undefined
  }, obj)

// https://docs.wompi.co — event checksum: SHA256 of the properties listed in
// signature.properties (read from `data`, in order), then the timestamp,
// then the events secret, all concatenated.
export const verifyWompiEventSignature = (payload: WompiEventPayload): boolean => {
  const properties = payload?.signature?.properties
  const checksum = payload?.signature?.checksum

  if (!Array.isArray(properties) || !checksum || typeof payload.timestamp !== 'number') {
    return false
  }

  const concatenated =
    properties.map((prop) => String(getByPath(payload.data, prop) ?? '')).join('') +
    String(payload.timestamp) +
    getEventsSecret()

  const computed = crypto.createHash('sha256').update(concatenated).digest('hex')

  const computedBuffer = Buffer.from(computed)
  const checksumBuffer = Buffer.from(checksum)

  return (
    computedBuffer.length === checksumBuffer.length &&
    crypto.timingSafeEqual(computedBuffer, checksumBuffer)
  )
}
