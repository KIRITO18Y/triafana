'use client'
import Link from 'next/link'
import './cart.css'
import { useCart } from '@/context/CartContext'
import { CartItems } from '@/components/ShoppingCart/CartItems/CartItems'
import CartSummary from '@/components/ShoppingCart/CartSummary/CartSummary'
import EmptyCart from '@/components/ShoppingCart/EmptyCart/EmptyCart'

const Cart = () => {
  const { cart } = useCart()

  return (
    <main>
      <section className="page-head">
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link> / <span>Carrito</span>
        </nav>

        <h1 className="page-title">Tu carrito</h1>
      </section>

      <section style={{ padding: '24px 0 60px' }}>
        <div className="cart-layout">
          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <CartItems />
              <CartSummary />
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default Cart
