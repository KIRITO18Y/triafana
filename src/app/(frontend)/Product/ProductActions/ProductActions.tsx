'use client'
import './productActions.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { Product } from '@/payload-types'
import AddToCartButton from '../../../../components/AddToCartButton'

type Props = {
  product: Product
}

export default function ProductActions({ product }: Props) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleBuyNow = () => {
    addToCart(product, quantity)
    router.push('/checkout')
  }

  return (
    <>
      <div>
        <div className="opt-block">
          <label>Cantidad</label>
          <div className="qty">
            <button
              className="qtyBtn"
              type="button"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              −
            </button>

            <input type="text" value={quantity} readOnly aria-label="Cantidad" />
            <button className="qtyBtn" type="button" onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
          </div>
        </div>
        <div className="product-actions-group">
          <AddToCartButton product={product} quantity={quantity} />
          <button className="btn-buy" onClick={handleBuyNow}>
            Comprar ahora
          </button>
        </div>
      </div>
    </>
  )
}
