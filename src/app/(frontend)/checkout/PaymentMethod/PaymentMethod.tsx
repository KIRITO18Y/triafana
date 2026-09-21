import '../form.css'
import './PaymentMethod.css'

type PayMethod = 'card' | 'pse' | 'cod'

type CheckoutForm = {
    tarjeta: string
    nombreTarjeta: string
    vencimiento: string
    cvv: string
}

type PaymentMethodProps = {
    payMethod: PayMethod
    setPayMethod: (method: PayMethod) => void
    form: CheckoutForm
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
}

export default function PaymentMethod({
    payMethod,
    setPayMethod,
    form,
    onChange,
}: PaymentMethodProps) {
    return (
        <div className="form-card">

            <h3>
                <span className="checkoutBadge badge-cyan">3</span>
                Método de pago
            </h3>

            <div
                className="pay-methods"
                role="radiogroup"
                aria-label="Método de pago"
            >

                <button
                    type="button"
                    role="radio"
                    aria-checked={payMethod === 'card'}
                    className={`pay-opt ${payMethod === 'card' ? 'is-active' : ''
                        }`}
                    onClick={() => setPayMethod('card')}
                >
                    <span className="ic">💳</span>
                    Tarjeta
                </button>

                <button
                    type="button"
                    role="radio"
                    aria-checked={payMethod === 'pse'}
                    className={`pay-opt ${payMethod === 'pse' ? 'is-active' : ''
                        }`}
                    onClick={() => setPayMethod('pse')}
                >
                    <span className="ic">🏦</span>
                    PSE
                </button>

                <button
                    type="button"
                    role="radio"
                    aria-checked={payMethod === 'cod'}
                    className={`pay-opt ${payMethod === 'cod' ? 'is-active' : ''
                        }`}
                    onClick={() => setPayMethod('cod')}
                >
                    <span className="ic">📦</span>
                    Contraentrega
                </button>

            </div>

            {payMethod === 'card' && (
                <div id="card-fields">

                    <div className="form-grid">

                        <div className="field full">
                            <label>Número de tarjeta</label>

                            <input
                                type="text"
                                name="tarjeta"
                                value={form.tarjeta}
                                onChange={onChange}
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
                                onChange={onChange}
                                placeholder="Nombre"
                            />
                        </div>

                        <div className="field">
                            <label>Vencimiento</label>

                            <input
                                type="text"
                                name="vencimiento"
                                value={form.vencimiento}
                                onChange={onChange}
                                placeholder="MM/AA"
                            />
                        </div>

                        <div className="field">
                            <label>CVV</label>

                            <input
                                type="text"
                                name="cvv"
                                value={form.cvv}
                                onChange={onChange}
                                placeholder="123"
                                inputMode="numeric"
                            />
                        </div>

                    </div>

                </div>
            )}

            {payMethod === 'pse' && (
                <p className="datas">
                    Serás redirigido a tu banco para autorizar el débito
                    (demo: no se cobra nada).
                </p>
            )}

            {payMethod === 'cod' && (
                <p className="datas">
                    Pagas en efectivo o datáfono cuando recibas tu pedido.
                </p>
            )}

            <p className="datas">

                <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="var(--teal)"
                    strokeWidth="2"
                >
                    <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                    />

                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>

                Tus datos están protegidos con cifrado SSL.
                Pasarela de pagos integrada.
            </p>

        </div>
    )
}