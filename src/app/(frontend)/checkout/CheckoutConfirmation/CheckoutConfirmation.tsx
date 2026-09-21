import './CheckoutConfirmation.css'

type Order = {
    number: string
    total: number
    items: number
}

type CheckoutConfirmationProps = {
    order: Order
}

export default function CheckoutConfirmation({
    order,
}: CheckoutConfirmationProps) {
    return (
        <div className="checkout-container">
            <section className="page-head"> <nav className="breadcrumb"> <a href="/">Inicio</a>
                {' / '}
                <a href="/cart">Carrito</a>
                {' / '}
                <span>Confirmación</span>
            </nav>

            </section>
            <div className="confirm-wrap">
                <div className="confirm-card">
                    <div
                        className="confirm-check"
                        aria-hidden="true"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    </div>
                    <span className="confirm-eyebrow">
                        Pedido confirmado
                    </span>
                    <h1 className="confirm-title">
                        ¡Gracias por tu compra!
                    </h1>
                    <p className="confirm-text">
                        Tu pedido{' '}
                        <strong>
                            #{order.number}
                        </strong>{' '}
                        por{' '}
                        <strong>
                            ${order.total.toLocaleString('es-CO')}
                        </strong>{' '}
                        fue recibido. Te enviamos la
                        confirmación a tu correo con los
                        detalles y el seguimiento.
                    </p>

                    <div className="confirm-grid">
                        <div className="confirm-mini">
                            <strong>Pago</strong>
                            <span>Aprobado ✓</span>
                        </div>

                        <div className="confirm-mini">
                            <strong>Entrega</strong>
                            <span>24–48h hábiles</span>
                        </div>

                        <div className="confirm-mini">
                            <strong>Soporte</strong>
                            <span>
                                soporte@triafana.com
                            </span>
                        </div>

                    </div>

                    <div className="confirm-actions">
                        <a className="confirm-btn" href="/account" >
                            Ver mis compras
                        </a>

                        <a className="confirm-link" href="/store">
                            Seguir comprando
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}