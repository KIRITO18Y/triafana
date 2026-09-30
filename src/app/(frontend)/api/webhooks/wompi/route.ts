import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { verifyWompiEventSignature } from '@/lib/wompi'

const KNOWN_STATUSES = ['PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR'] as const
type WompiStatus = (typeof KNOWN_STATUSES)[number]

const isWompiStatus = (value: unknown): value is WompiStatus =>
  typeof value === 'string' && (KNOWN_STATUSES as readonly string[]).includes(value)

type WompiEventBody = {
  event?: string
  data?: {
    transaction?: {
      id?: string
      status?: string
      reference?: string
      payment_method_type?: string
    }
  }
  signature?: { properties: string[]; checksum: string }
  timestamp?: number
}

// Wompi's source of truth for payment status: it POSTs here whenever a
// transaction changes state. The redirect back to /checkout/resultado is
// only a UX convenience — a closed tab or flaky network must not be able to
// leave an order stuck as PENDING forever, so this webhook is what actually
// marks orders paid.
export async function POST(request: NextRequest) {
  let body: WompiEventBody

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'invalid json' }, { status: 400 })
  }

  if (body.event !== 'transaction.updated') {
    return NextResponse.json({ received: true })
  }

  if (
    !verifyWompiEventSignature({
      data: (body.data ?? {}) as Record<string, unknown>,
      signature: body.signature as { properties: string[]; checksum: string },
      timestamp: body.timestamp as number,
    })
  ) {
    console.error('WOMPI_WEBHOOK_INVALID_SIGNATURE')
    return NextResponse.json({ message: 'invalid signature' }, { status: 401 })
  }

  const transaction = body.data?.transaction

  if (!transaction?.reference || !isWompiStatus(transaction.status)) {
    return NextResponse.json({ message: 'malformed payload' }, { status: 400 })
  }

  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'orders',
    where: { reference: { equals: transaction.reference } },
    limit: 1,
    overrideAccess: true,
  })

  const order = existing.docs[0]

  if (!order) {
    console.error('WOMPI_WEBHOOK_ORDER_NOT_FOUND', transaction.reference)
    return NextResponse.json({ received: true })
  }

  // Already settled by a previous delivery of this (or a newer) event —
  // Wompi retries undelivered webhooks, and a final status shouldn't be
  // overwritten by a stale one arriving out of order.
  if (['APPROVED', 'DECLINED', 'VOIDED'].includes(order.paymentStatus ?? '')) {
    return NextResponse.json({ received: true })
  }

  await payload.update({
    collection: 'orders',
    id: order.id,
    data: {
      paymentStatus: transaction.status,
      wompiTransactionId: transaction.id,
      paymentMethodType: transaction.payment_method_type,
    },
    overrideAccess: true,
  })

  return NextResponse.json({ received: true })
}
