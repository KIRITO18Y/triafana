'use client'
import './cartItems.css'
import { useCart } from '@/context/CartContext'
export type CartItem = {
  id: number
  name: string
  price: number
  image: string | { url?: string | null }
  quantity: number
}

export const CartItems = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart()
  const formatPrice = (price: number) => {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  }

  return (
    <div className="cart-items">
      {cart.map((item) => (
        <div key={item.id} className="cart-row">
          <div className="thumb">
            <img src={typeof item.image === 'string' ? item.image : (item.image?.url ?? '')} />
          </div>

          <div>
            <span className="cat">tecnologia</span>
            <h4>{item.name}</h4>
            <div className="qty">
              <button className="qtybutton" type="button" onClick={() => decreaseQuantity(item.id)}>
                −
              </button>

              <input type="text" value={item.quantity} aria-label="Cantidad" readOnly />
              <button className="qtybutton" type="button" onClick={() => increaseQuantity(item.id)}>
                +
              </button>
            </div>
            <button className="remove" onClick={() => removeFromCart(item.id)}>
              Eliminar
            </button>
          </div>
          <div className="line-price">
            <span className="price">{formatPrice(Number(item.price) || 0)}</span>
            <span className="span-oldPrice">{formatPrice(Number(item.oldPrice))}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
