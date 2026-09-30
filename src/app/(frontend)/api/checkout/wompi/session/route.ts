import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { headers as nextHeaders } from 'next/headers'
import crypto from 'crypto'
import config from '@payload-config'
import { buildIntegritySignature, getWompiPublicKey } from '@/lib/wompi'

type CheckoutRequestBody = {
  items?: { productId?: number | string; quantity?: number }[]
  shipping?: {
    address?: string
    city?: string
    department?: string
    postalCode?: string
    notes?: string
    phone?: string
  }
}

// Creates a pending Order from the customer's cart (recomputing every price
// server-side, since a client can send anything) and returns the params the
// browser needs to open Wompi's Web Checkout widget, including a signature
// computed here so WOMPI_INTEGRITY_SECRET never reaches the client.
export async function POST(request: NextRequest) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await nextHeaders() })

  if (!user) {
    return NextResponse.json({ message: 'Debes iniciar sesión para pagar' }, { status: 401 })
  }

  const customer = user as typeof user & { firstName?: string; lastName?: string }

  let body: CheckoutRequestBody

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Cuerpo de solicitud inválido' }, { status: 400 })
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ message: 'El carrito está vacío' }, { status: 400 })
  }

  const shipping = body.shipping ?? {}

  if (!shipping.address?.trim() || !shipping.city?.trim() || !shipping.department?.trim() || !shipping.phone?.trim()) {
    return NextResponse.json({ message: 'Faltan datos de envío' }, { status: 400 })
  }

  const items: { product: number; quantity: number; price: number }[] = []
  let total = 0

  for (const line of body.items) {
    const quantity = Math.floor(Number(line.quantity))

    if (!line.productId || !Number.isFinite(quantity) || quantity < 1) {
      return NextResponse.json({ message: 'Producto inválido en el carrito' }, { status: 400 })
    }

    const product = await payload
      .findByID({ collection: 'products', id: line.productId })
      .catch(() => null)

    if (!product) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 400 })
    }

    const price = Number(product.price)

    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ message: 'Producto con precio inválido' }, { status: 400 })
    }

    total += price * quantity
    items.push({ product: product.id, quantity, price })
  }

  const reference = `triafana-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`
  const currency = 'COP'
  const amountInCents = Math.round(total * 100)

  const order = await payload.create({
    collection: 'orders',
    data: {
      customer: user.id,
      items,
      total,
      shipping: {
        address: shipping.address,
        city: shipping.city,
        department: shipping.department,
        postalCode: shipping.postalCode,
        notes: shipping.notes,
        phone: shipping.phone,
      },
      reference,
      paymentStatus: 'PENDING',
    },
    overrideAccess: true,
  })

  const signature = buildIntegritySignature({ reference, amountInCents, currency })

  return NextResponse.json({
    orderId: order.id,
    reference,
    amountInCents,
    currency,
    signature,
    publicKey: getWompiPublicKey(),
    customerData: {
      email: user.email,
      fullName: `${customer.firstName ?? ''} ${customer.lastName ?? ''}`.trim(),
      phoneNumber: shipping.phone,
    },
  })
}
