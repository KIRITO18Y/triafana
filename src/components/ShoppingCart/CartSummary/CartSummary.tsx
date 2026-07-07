'use client'

import Link from 'next/link'
import './cartSummary.css'
import { useCart } from '@/context/CartContext'

const CartSummary = () => {
  const { cart } = useCart()

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const shipping = 0
  const discount = 0

  const total = subtotal + shipping - discount

  const formatPrice = (price: number) => `$${price.toLocaleString('es-CO')}`

  return (
    <aside className="summary">
      <h3>Resumen del pedido</h3>

      <div className="line">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className="line">
        <span>Envío</span>
        <span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
      </div>

      <div className="line">
        <span>Descuento</span>
        <span>{formatPrice(discount)}</span>
      </div>

      <div className="line total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>

      <Link href="/checkout" className="btn btn-primary btn-block btn-lg">
        Finalizar compra
      </Link>

      <Link href="/store" className="btn btn-ghost btn-block">
        Seguir comprando
      </Link>

      <p>🔒 Pago seguro · Datos cifrados</p>
    </aside>
  )
}

export default CartSummary
