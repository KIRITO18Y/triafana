'use client'
import { Product } from '@/payload-types'
import { createContext, useContext, useState, ReactNode } from 'react'
import { toast } from 'react-toastify'
export type { Product }
export type CartItem = {
  id: number
  name: string
  price: number
  oldPrice: number
  image:
    | string
    | {
        url?: string | null
      }
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  removeFromCart: (id: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product, quantity: number = 1) => {
    const shortName = product.name.length > 20 ? `${product.name.slice(0, 20)}` : product.name

    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id)

      if (existing) {
        toast.success(`"${shortName}"agregado al carrito`, {
          toastId: 'cart-toast',
        })

        return prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                quantity: p.quantity + quantity,
              }
            : p,
        )
      }

      toast.success(`"${shortName}" agregado al carrito`, {
        toastId: 'cart-toast',
      })

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          oldPrice: Number(product.oldPrice) || 0,
          image:
            typeof product.image === 'object' ? (product.image?.url ?? '') : (product.image ?? ''),
          quantity,
        },
      ]
    })
  }

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    )
  }

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id: number) => {
    const product = cart.find((item) => item.id === id)
    setCart((prev) => prev.filter((item) => item.id !== id))
    if (product) {
      const shortName = product.name.length > 18 ? `${product.name.slice(0, 18)}` : product.name

      toast.info(`"${shortName}" eliminado del carrito`, {
        toastId: 'remove-toast',
      })
    }
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }

  return context
}
