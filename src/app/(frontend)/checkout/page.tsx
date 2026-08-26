'use client'

import './chekout.css'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

const CheckoutPage = () => {
  const { cart } = useCart()

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
    tarjeta: '',
    nombreTarjeta: '',
    vencimiento: '',
    cvv: '',
  })

  const datosCompletos =
    form.nombre.trim() && form.apellido.trim() && form.correo.trim() && form.telefono.trim()

  const envioCompleto = form.direccion.trim() && form.ciudad.trim() && form.departamento.trim()

  const pagoCompleto =
    form.tarjeta.trim() && form.nombreTarjeta.trim() && form.vencimiento.trim() && form.cvv.trim()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
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

        <div className={`step ${pagoCompleto ? 'is-complete' : ''}`}>
          <span className="n">3</span> Pago
        </div>
      </div>

      <section>
        <div className="checkout-layout">
          <form onSubmit={(e) => e.preventDefault()}>
            {/* INFORMACIÓN DE CONTACTO */}
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
                <div className="pay-opt is-active" data-pay="card">
                  <span className="ic">💳</span>
                  Tarjeta
                </div>

                <div className="pay-opt" data-pay="pse">
                  <span className="ic">🏦</span>
                  PSE
                </div>

                <div className="pay-opt" data-pay="cod">
                  <span className="ic">📦</span>
                  Contraentrega
                </div>
              </div>

              <div id="card-fields">
                <div className="form-grid">
                  <div className="field full">
                    <label>Número de tarjeta</label>

                    <input
                      type="text"
                      name="tarjeta"
                      value={form.tarjeta}
                      onChange={handleChange}
                      placeholder="0000 0000 0000 0000"
                      inputMode="numeric"
                    />
                  </div>

                  <div className="field full">
                    <label>Nombre en la tarjeta</label>

                    <input
                      type="text"
                      name="nombreTarjeta"
                      value={form.nombreTarjeta}
                      onChange={handleChange}
                      placeholder="Nombre"
                    />
                  </div>

                  <div className="field">
                    <label>Vencimiento</label>

                    <input
                      type="text"
                      name="vencimiento"
                      value={form.vencimiento}
                      onChange={handleChange}
                      placeholder="MM/AA"
                    />
                  </div>

                  <div className="field">
                    <label>CVV</label>

                    <input
                      type="text"
                      name="cvv"
                      value={form.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      inputMode="numeric"
                    />
                  </div>
                </div>
              </div>

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
                          ? `${summyCart.name.slice(0, 25)}...`
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

              <button type="button" className="btn btn-primary btn-block btn-lg" id="pay-btn">
                Pagar ahora
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
