'use client'

import Link from 'next/link'
import './cartSummary.css'
import { useCart } from '@/context/CartContext'
import { CouponField } from '@/components/CouponField/CouponField'
import { calcDiscount, formatCOP, minPurchaseWarning } from '@/lib/coupons'

const CartSummary = () => {
  const { cart, coupon } = useCart()

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const shipping = 0
  const discount =
    coupon && !minPurchaseWarning(subtotal, coupon) ? calcDiscount(subtotal, coupon) : 0

  const total = subtotal - discount + shipping

  return (
    <aside className="summary">
      <h3>Resumen del pedido</h3>

      <div className="line">
        <span>Subtotal</span>
        <span>{formatCOP(subtotal)}</span>
      </div>

      <div className="line">
        <span>Envío</span>
        <span>{shipping === 0 ? 'Gratis' : formatCOP(shipping)}</span>
      </div>

      <div className="line">
        <span>Descuento{coupon && discount > 0 ? ` (${coupon.code})` : ''}</span>
        <span>{discount > 0 ? `−${formatCOP(discount)}` : formatCOP(0)}</span>
      </div>

      <CouponField subtotal={subtotal} />

      <div className="line total">
        <span>Total</span>
        <span>{formatCOP(total)}</span>
      </div>

      <Link href="/checkout" className="btn btn-primary btn-block btn-lg" style={{ padding: '20px' }}>
        Finalizar compra
      </Link>

      <Link href="/store" className="btn btn-ghost btn-block" style={{ marginTop: '1rem', padding: '20px' }}>
        Seguir comprando
      </Link>

      <p className="p-secure">
        🔒 Pago seguro · Datos cifrados
      </p>
    </aside>
  )
}

export default CartSummary
