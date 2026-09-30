'use client'

import './chekout.css'
import { useCart } from '@/context/CartContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const WOMPI_WIDGET_SRC = 'https://checkout.wompi.co/widget.js'

type WompiTransactionResult = {
  transaction?: { id?: string; status?: string }
}

declare global {
  interface Window {
    WidgetCheckout?: new (config: {
      currency: string
      amountInCents: number
      reference: string
      publicKey: string
      signature: { integrity: string }
      redirectUrl?: string
      customerData?: { email?: string; fullName?: string; phoneNumber?: string }
    }) => {
      open: (callback: (result: WompiTransactionResult) => void) => void
    }
  }
}

const CheckoutPage = () => {
  const { cart, clearCart } = useCart()
  const router = useRouter()

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

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
  })

  const [paying, setPaying] = useState(false)
  const [widgetReady, setWidgetReady] = useState(false)

  useEffect(() => {
    if (document.querySelector(`script[src="${WOMPI_WIDGET_SRC}"]`)) {
      setWidgetReady(true)
      return
    }

    const script = document.createElement('script')
    script.src = WOMPI_WIDGET_SRC
    script.async = true
    script.onload = () => setWidgetReady(true)
    document.body.appendChild(script)
  }, [])

  const datosCompletos = Boolean(
    form.nombre.trim() && form.apellido.trim() && form.correo.trim() && form.telefono.trim(),
  )

  const envioCompleto = Boolean(
    form.direccion.trim() && form.ciudad.trim() && form.departamento.trim(),
  )

  const listoParaPagar = datosCompletos && envioCompleto

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handlePay = async () => {
    if (!listoParaPagar) {
      toast.error('Completa tus datos de contacto y de envío antes de pagar')
      return
    }

    if (cart.length === 0) {
      toast.error('Tu carrito está vacío')
      return
    }

    if (!widgetReady || !window.WidgetCheckout) {
      toast.error('La pasarela de pagos aún está cargando, intenta de nuevo en unos segundos')
      return
    }

    setPaying(true)

    try {
      const res = await fetch('/api/checkout/wompi/session', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({ productId: item.id, quantity: item.quantity })),
          shipping: {
            address: form.direccion,
            city: form.ciudad,
            department: form.departamento,
            postalCode: form.codigoPostal || undefined,
            notes: form.indicaciones || undefined,
            phone: form.telefono,
          },
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message || 'No se pudo iniciar el pago')
      }

      const checkout = new window.WidgetCheckout({
        currency: data.currency,
        amountInCents: data.amountInCents,
        reference: data.reference,
        publicKey: data.publicKey,
        signature: { integrity: data.signature },
        redirectUrl: `${window.location.origin}/checkout/resultado`,
        customerData: {
          email: data.customerData?.email,
          fullName: data.customerData?.fullName,
          phoneNumber: data.customerData?.phoneNumber,
        },
      })

      checkout.open((result) => {
        const status = result?.transaction?.status

        if (status === 'APPROVED') {
          clearCart()
          toast.success('¡Pago aprobado!')
        } else if (status === 'DECLINED' || status === 'ERROR') {
          toast.error('El pago no pudo procesarse')
        } else {
          toast.info('Tu pago está siendo procesado')
        }

        router.push(`/checkout/resultado?ref=${data.reference}`)
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ocurrió un error al iniciar el pago')
    } finally {
      setPaying(false)
    }
  }

  return (
    <div className="checkout-container">
      <section className="page-head">
        <nav className="breadcrumb">
          <a href="/">Inicio</a> / <a href="/cart">Carrito</a> / <span>Checkout</span>
        </nav>

        <h1 className="page-title">Finalizar compra</h1>
      </section>

      <div className="steps">
        <div className={`step ${datosCompletos ? 'is-complete' : ''}`}>
          <span className="n">1</span> Datos
        </div>

        <div className={`step ${envioCompleto ? 'is-complete' : ''}`}>
          <span className="n">2</span> Envío
        </div>

        <div className={`step ${listoParaPagar ? 'is-complete' : ''}`}>
          <span className="n">3</span> Pago
        </div>
      </div>

      <section>
        <div className="checkout-layout">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-card">
              <h3>
                <span className="checkoutBadge badge-cyan">1</span>
                Información de contacto
              </h3>

              <div className="form-grid">
                <div className="field">
                  <label>Nombre</label>

                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                  />
                </div>

                <div className="field">
                  <label>Apellido</label>

                  <input
                    type="text"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    placeholder="Apellido"
                    required
                  />
                </div>

                <div className="field full">
                  <label>Correo electrónico</label>

                  <input
                    type="email"
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    placeholder="Gmail"
                    required
                  />
                </div>

                <div className="field full">
                  <label>Teléfono</label>

                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="Teléfono"
                    required
                  />
                </div>
              </div>
            </div>

            {/* DIRECCIÓN DE ENVÍO */}
            <div className="form-card">
              <h3>
                <span className="checkoutBadge badge-cyan">2</span>
                Dirección de envío
              </h3>

              <div className="form-grid">
                <div className="field full">
                  <label>Dirección</label>

                  <input
                    type="text"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    placeholder="Cra 00 # 00-00"
                    required
                  />
                </div>

                <div className="field">
                  <label>Ciudad</label>

                  <input
                    type="text"
                    name="ciudad"
                    value={form.ciudad}
                    onChange={handleChange}
                    placeholder="Bogotá"
                    required
                  />
                </div>

                <div className="field">
                  <label>Departamento</label>

                  <select
                    name="departamento"
                    value={form.departamento}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="Cundinamarca">Cundinamarca</option>
                    <option value="Antioquia">Antioquia</option>
                    <option value="Valle del Cauca">Valle del Cauca</option>
                    <option value="Atlántico">Atlántico</option>
                    <option value="Santander">Santander</option>
                  </select>
                </div>

                <div className="field">
                  <label>Código postal</label>

                  <input
                    type="text"
                    name="codigoPostal"
                    value={form.codigoPostal}
                    onChange={handleChange}
                    placeholder="110111"
                  />
                </div>

                <div className="field">
                  <label>Indicaciones (opcional)</label>

                  <input
                    type="text"
                    name="indicaciones"
                    value={form.indicaciones}
                    onChange={handleChange}
                    placeholder="Apto, torre…"
                  />
                </div>
              </div>
            </div>

            {/* MÉTODO DE PAGO */}
            <div className="form-card">
              <h3>
                <span className="checkoutBadge badge-cyan">3</span>
                Método de pago
              </h3>

              <div className="pay-methods">
                <div className="pay-opt is-active">
                  <span className="ic">💳</span>
                  Tarjeta
                </div>

                <div className="pay-opt">
                  <span className="ic">🏦</span>
                  PSE
                </div>

                <div className="pay-opt">
                  <span className="ic">📱</span>
                  Nequi
                </div>

                <div className="pay-opt">
                  <span className="ic">🏛️</span>
                  Bancolombia
                </div>
              </div>

              <p className="datas">
                Al hacer clic en &quot;Pagar ahora&quot; serás redirigido a la pasarela segura de
                Wompi, donde eliges tu método de pago e ingresas tus datos directamente. Nunca
                almacenamos ni vemos tu información de tarjeta.
              </p>

              <p className="datas">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="var(--teal)"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />

                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Tus datos están protegidos con cifrado SSL. Pasarela de pagos integrada.
              </p>
            </div>
          </form>

          <aside className="summary">
            <h3>Tu pedido</h3>

            <div>
              {cart.map((summyCart) => (
                <div key={summyCart.id} className="summycart-infor">
                  <div className="summy-img">
                    <div className="img-summy">
                      <img
                        src={
                          typeof summyCart.image === 'string'
                            ? summyCart.image
                            : (summyCart.image?.url ?? '')
                        }
                        alt={summyCart.name}
                      />
                    </div>

                    <div className="summycart-perdidos">
                      <h4>
                        {summyCart.name.length > 17
                          ? `${summyCart.name.slice(0, 17)}...`
                          : summyCart.name}
                      </h4>

                      <div className="price-container">
                        <span>x{summyCart.quantity}</span>$
                        {(summyCart.price * summyCart.quantity).toLocaleString('es-CO')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="line">
                <span>Subtotal</span>

                <span>${subtotal.toLocaleString('es-CO')}</span>
              </div>

              <div className="line">
                <span>Envío</span>

                <span id="c-ship">Gratis</span>
              </div>

              <div className="line total">
                <span>Total</span>

                <span id="c-total">${subtotal.toLocaleString('es-CO')}</span>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-block btn-lg"
                id="pay-btn"
                onClick={handlePay}
                disabled={paying || cart.length === 0}
              >
                {paying ? 'Procesando...' : 'Pagar ahora'}
              </button>

              <a className="btn btn-ghost btn-block" href="/cart">
                Volver al carrito
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default CheckoutPage
