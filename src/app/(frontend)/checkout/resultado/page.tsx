import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import '../chekout.css'

type Props = {
  searchParams: Promise<{ id?: string; ref?: string }>
}

const statusCopy: Record<string, { title: string; detail: string }> = {
  PENDING: {
    title: 'Tu pago está siendo procesado',
    detail: 'Estamos confirmando el pago con la entidad. Te enviaremos un correo apenas se confirme.',
  },
  APPROVED: {
    title: '¡Pago aprobado!',
    detail: 'Tu pedido fue confirmado. Te enviamos un correo con el resumen de la compra.',
  },
  DECLINED: {
    title: 'El pago fue rechazado',
    detail: 'La entidad no aprobó el pago. Puedes volver al carrito e intentarlo de nuevo.',
  },
  VOIDED: {
    title: 'El pago fue anulado',
    detail: 'Esta transacción fue anulada. Si crees que es un error, contáctanos.',
  },
  ERROR: {
    title: 'Ocurrió un error con el pago',
    detail: 'No pudimos procesar el pago. Puedes intentarlo de nuevo desde el carrito.',
  },
}

const CheckoutResultPage = async ({ searchParams }: Props) => {
  const { ref } = await searchParams
  const payload = await getPayload({ config })

  const order = ref
    ? (
        await payload.find({
          collection: 'orders',
          where: { reference: { equals: ref } },
          limit: 1,
          overrideAccess: true,
        })
      ).docs[0]
    : null

  const status = order?.paymentStatus ?? 'PENDING'
  const copy = statusCopy[status] ?? statusCopy.PENDING

  return (
    <div className="checkout-container">
      <section className="page-head">
        <nav className="breadcrumb">
          <a href="/">Inicio</a> / <span>Resultado del pago</span>
        </nav>

        <h1 className="page-title">{copy.title}</h1>
      </section>

      <section>
        <div className="form-card">
          {order ? (
            <>
              <p>
                Pedido #{order.id} · Referencia {order.reference}
              </p>
              <p>Total: ${Number(order.total).toLocaleString('es-CO')}</p>
            </>
          ) : (
            <p>No encontramos una orden asociada a este pago.</p>
          )}

          <p>{copy.detail}</p>

          <Link href="/store" className="btn btn-primary btn-block btn-lg">
            Seguir comprando
          </Link>

          {status !== 'APPROVED' && (
            <Link href="/cart" className="btn btn-ghost btn-block">
              Volver al carrito
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default CheckoutResultPage
