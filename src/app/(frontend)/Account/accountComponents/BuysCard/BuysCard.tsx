'use client'
import './buysCard.css'
import { useEffect, useState } from 'react'

type OrderItem = {
  name: string
  price: number
  quantity: number
}

type Order = {
  id: number | string
  orderNumber: string
  items: OrderItem[]
  total: number
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
}

const statusLabel: Record<Order['status'], string> = {
  processing: 'En camino',
  shipped: 'En camino',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

export const BuysCard = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch('/api/orders?sort=-createdAt&limit=10', {
          credentials: 'include',
          cache: 'no-store',
        })
        if (!res.ok) return
        const data = await res.json()
        setOrders(data.docs || [])
      } catch (error) {
        console.error('Error cargando pedidos:', error)
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [])

  const formatPrice = (price: number) => `$${price.toLocaleString('es-CO')}`

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  return (
    <div className="buysCard">
      <h3 className="buys-title">Mis Compras</h3>

      {loading ? (
        <p className="lead">Cargando tus compras…</p>
      ) : orders.length === 0 ? (
        <p className="lead">
          Aún no tienes compras. <a href="/store">Explora la tienda →</a>
        </p>
      ) : (
        orders.map((order) => {
          const qty =
            order.items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0
          return (
            <div className="order-row" key={order.id}>
              <div>
                <div className="oid">#{order.orderNumber}</div>
                <div className="meta">
                  {formatDate(order.createdAt)} · {qty} {qty === 1 ? 'producto' : 'productos'}
                </div>
              </div>
              <span className={`status ${order.status === 'delivered' ? 'ok' : 'pend'}`}>
                {statusLabel[order.status] || order.status}
              </span>
              <span className="price">{formatPrice(order.total)}</span>
            </div>
          )
        })
      )}
    </div>
  )
}
