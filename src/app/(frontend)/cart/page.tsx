'use client'
import './cart.css'
import { useCart } from '@/context/CartContext'
import { CartItems } from '@/components/ShoppingCart/CartItems/CartItems'
import CartSummary from '@/components/ShoppingCart/CartSummary/CartSummary'
import EmptyCart from '@/components/ShoppingCart/EmptyCart/EmptyCart'

const Cart = () => {
  const { cart } = useCart()

  return (
    <div className="cart-container">
      <section className="page-head">
        <nav className="nav-cart">
          <a href="/">Inicio</a> / <span>Carrito</span>
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
    </div>
  )
}

export default Cart
