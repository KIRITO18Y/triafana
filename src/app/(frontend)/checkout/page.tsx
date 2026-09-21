'use client'

import './checkout.css'
import { useCart } from '@/context/CartContext'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { calcDiscount, minPurchaseWarning } from '@/lib/coupons'
import CheckoutSteps from './CheckoutSteps/CheckoutSteps'
import ContactForm from './ContactForm/ContactForm'
import ShippingForm from './ShippingForm/ShippingForm'
import PaymentMethod from './PaymentMethod/PaymentMethod'
import OrderSummary from './OrderSummary/OrderSummary'
import CheckoutConfirmation from './CheckoutConfirmation/CheckoutConfirmation'

type PayMethod = 'card' | 'pse' | 'cod'

type SessionUser = {
  id: number | string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

const CheckoutPage = () => {
  const { cart, coupon, clearCart } = useCart()

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount =
    coupon && !minPurchaseWarning(subtotal, coupon) ? calcDiscount(subtotal, coupon) : 0
  const total = subtotal - discount

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    departamento: '',
    codigoPostal: '',
    indicaciones: '',
    tarjeta: '',
    nombreTarjeta: '',
    vencimiento: '',
    cvv: '',
  })

  const [payMethod, setPayMethod] = useState<PayMethod>('card')
  const [error, setError] = useState('')
  const [paying, setPaying] = useState(false)
  const [order, setOrder] = useState<{ number: string; total: number; items: number } | null>(null)
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/customers/me', {
          credentials: 'include',
          cache: 'no-store',
        })
        if (!res.ok) return
        const data = await res.json()
        if (data?.user) {
          setSessionUser(data.user)
          setForm((prev) => ({
            ...prev,
            nombre: prev.nombre || data.user.firstName || '',
            apellido: prev.apellido || data.user.lastName || '',
            correo: prev.correo || data.user.email || '',
            telefono: prev.telefono || data.user.phone || '',
          }))
        }
      } catch {
        // Sin sesión: el pago pedirá iniciar sesión
      } finally {
        setCheckingSession(false)
      }
    }
    checkSession()
  }, [])

  const datosCompletos =
    form.nombre.trim() && form.apellido.trim() && form.correo.trim() && form.telefono.trim()

  const envioCompleto = form.direccion.trim() && form.ciudad.trim() && form.departamento.trim()

  const pagoCompleto =
    payMethod !== 'card' ||
    (form.tarjeta.trim() && form.nombreTarjeta.trim() && form.vencimiento.trim() && form.cvv.trim())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handlePay = async () => {
    if (cart.length === 0) {
      setError('Tu carrito está vacío. Agrega productos antes de pagar.')
      return
    }

    if (checkingSession) return

    if (!datosCompletos) {
      setError('Completa tu nombre, apellido, correo y teléfono.')
      toast.error('Faltan tus datos de contacto', { toastId: 'checkout-error' })
      return
    }

    if (!envioCompleto) {
      setError('Completa la dirección, ciudad y departamento de envío.')
      toast.error('Falta la dirección de envío', { toastId: 'checkout-error' })
      return
    }

    if (!pagoCompleto) {
      setError('Completa los datos de tu tarjeta.')
      toast.error('Faltan los datos de la tarjeta', { toastId: 'checkout-error' })
      return
    }

    setError('')
    setPaying(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...(sessionUser ? { customer: sessionUser.id } : {}),
          items: cart.map((item) => ({
            product: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image:
              typeof item.image === 'string' ? item.image : (item.image?.url ?? ''),
          })),
          subtotal,
          shipping: 0,
          total,
          couponCode: discount > 0 && coupon ? coupon.code : '',
          discount,
          payMethod,
          contactName: form.nombre.trim(),
          contactLastName: form.apellido.trim(),
          contactEmail: form.correo.trim(),
          contactPhone: form.telefono.trim(),
          address: form.direccion.trim(),
          city: form.ciudad.trim(),
          department: form.departamento.trim(),
          postalCode: form.codigoPostal.trim(),
          notes: form.indicaciones.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data?.errors?.[0]?.message || data?.message || 'No se pudo registrar el pedido.',
        )
      }

      const itemCount = cart.length
      setOrder({ number: data.doc.orderNumber, total: data.doc.total, items: itemCount })
      clearCart()
      setPaying(false)
      window.dispatchEvent(new Event('order-change'))
      toast.success('¡Pago aprobado! Pedido registrado', { toastId: 'checkout-success' })
    } catch (error) {
      console.error('Error creando pedido:', error)
      setError(
        error instanceof Error ? error.message : 'Ocurrió un error al procesar el pago.',
      )
      toast.error('No se pudo completar el pago', { toastId: 'checkout-error' })
      setPaying(false)
    }
  }

  if (order) {
    return <CheckoutConfirmation order={order} />
  }

  return (
    <div className="checkout-container">
      <section className="page-head">
        <nav className="breadcrumb">
          <a href="/">Inicio</a> / <a href="/cart">Carrito</a> / <span>Checkout</span>
        </nav>

        <h1 className="page-title">Finalizar compra</h1>
      </section>

      {!checkingSession && sessionUser && (
        <div className="checkout-layout" style={{ marginBottom: 12 }}>
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 12,
              background: 'rgba(10, 102, 109, .08)',
              fontSize: 14,
            }}
          >
            Comprando como <strong>{sessionUser.email}</strong>. El pedido quedará guardado en
            tus compras.
          </div>
        </div>
      )}

      <CheckoutSteps
        datosCompletos={Boolean(datosCompletos)}
        envioCompleto={Boolean(envioCompleto)}
        pagoCompleto={Boolean(pagoCompleto)}
      />

      <section>
        <div className="checkout-layout">
          <form onSubmit={(e) => e.preventDefault()}>
            <ContactForm form={form} onChange={handleChange} />

            <ShippingForm form={form} onChange={handleChange} />

            <PaymentMethod
              payMethod={payMethod}
              setPayMethod={setPayMethod}
              form={form}
              onChange={handleChange}
            />

            {error && <div className="auth-error">{error}</div>}
          </form>

          <OrderSummary
            cart={cart}
            subtotal={subtotal}
            discount={discount}
            total={total}
            coupon={coupon ? { code: coupon.code } : null}
            paying={paying}
            checkingSession={checkingSession}
            onPay={handlePay}
          />
        </div>
      </section>
    </div>
  )
}

export default CheckoutPage
