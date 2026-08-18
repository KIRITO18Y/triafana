'use client'
import { useCart, type Product } from '@/context/CartContext'

type Props = {
  product: Product
  quantity: number
}

export default function AddToCartButton({ product, quantity }: Props) {
  const { addToCart } = useCart()

  return (
    <button className="btn-cart" onClick={() => addToCart(product, quantity)}>
      Agregar al carrito
    </button>
  )
}
