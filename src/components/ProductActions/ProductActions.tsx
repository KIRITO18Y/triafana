'use client'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { Product } from '@/payload-types'
import AddToCartButton from '../AddToCartButton'

type Props = {
  product: Product
}

export default function ProductActions({ product }: Props) {
  const router = useRouter()
  const { addToCart } = useCart()

  const handleBuyNow = () => {
    addToCart(product)
    router.push('/checkout')
  }

  return (
    <div className="btn-container">
      <AddToCartButton product={product} />
      <button className="btn-buy" onClick={handleBuyNow}>
        Comprar ahora
      </button>
    </div>
  )
}
