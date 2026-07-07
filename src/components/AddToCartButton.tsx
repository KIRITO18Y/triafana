'use client'

import { useCart, type Product } from '@/context/CartContext'

type Props = {
  product: Product
}

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart()

  return (
    <button className="btn-cart" onClick={() => addToCart(product)}>
      Agregar al carrito
    </button>
  )
}
