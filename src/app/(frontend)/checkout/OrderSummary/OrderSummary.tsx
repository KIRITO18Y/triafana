import './OrderSummary.css'
import type { CartItem } from '@/context/CartContext'

type OrderSummaryProps = {
    cart: CartItem[]
    subtotal: number
    discount: number
    total: number
    coupon?: {
        code: string
    } | null
    paying: boolean
    checkingSession: boolean
    onPay: () => void
}

export default function OrderSummary({
    cart,
    subtotal,
    discount,
    total,
    coupon,
    paying,
    checkingSession,
    onPay,
}: OrderSummaryProps) {
    return (
        <aside className="order-summary">
            <h3>Tu pedido</h3>
            <div>
                {cart.length === 0 ? (
                    <p className="lead">
                        Tu carrito está vacío.{' '}
                    </p>
                ) : (
                    cart.map((item) => {
                        const image =
                            typeof item.image === 'string'
                                ? item.image
                                : item.image?.url ?? ''

                        return (
                            <div key={item.id} className="summycart-infor">
                                <div className="summy-img">
                                    <div className="img-summy">
                                        <img
                                            src={image}
                                            alt={item.name}
                                        />
                                    </div>

                                    <div className="summycart-perdidos">
                                        <h4>
                                            {item.name.length > 17
                                                ? `${item.name.slice(0, 17)}...`
                                                : item.name}
                                        </h4>
                                        <div className="price-container">
                                            <span>
                                                x{item.quantity}
                                            </span> $
                                            {(
                                                item.price * item.quantity
                                            ).toLocaleString('es-CO')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}

                <div className="order-line">
                    <span>Subtotal</span>
                    <span>
                        ${subtotal.toLocaleString('es-CO')}
                    </span>
                </div>

                {discount > 0 && (
                    <div className="order-line">
                        <span>
                            Descuento
                            {coupon ? ` (${coupon.code})` : ''}
                        </span>

                        <span>
                            −${discount.toLocaleString('es-CO')}
                        </span>

                    </div>
                )}

                <div className="order-line">
                    <span>Envío</span>
                    <span id="c-ship">
                        Gratis
                    </span>
                </div>

                <div className="order-line total">
                    <span>Total</span>

                    <span id="c-total">
                        ${total.toLocaleString('es-CO')}
                    </span>
                </div>

                <button
                    type="button"
                    className="btn btn-primary btn-block btn-lg"
                    id="pay-btn"
                    onClick={onPay}
                    disabled={
                        paying ||
                        checkingSession ||
                        cart.length === 0
                    }
                >
                    {paying
                        ? 'Procesando…'
                        : 'Pagar ahora'}
                </button>

                <a className="btn btn-ghost btn-block" href="/cart">
                    Volver al carrito
                </a>
            </div>
        </aside>
    )
}