'use client'

import './accountStat.css'
import { useCallback, useEffect, useState } from 'react'
export const AccountStat = () => {
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [ordersTotal, setOrdersTotal] = useState(0)
  const [ordersTransit, setOrdersTransit] = useState(0)
  
  const loadFavoritesCount = useCallback(async () => {
    try {
      const res = await fetch('/api/favorites?limit=1', {
        credentials: 'include',
        cache: 'no-store',
      })

      if (!res.ok) {
        setFavoritesCount(0)
        return
      }
      const data = await res.json()
      setFavoritesCount(data.totalDocs || 0)
    } catch (error) {
      console.error('Error contando favoritos:', error)
      setFavoritesCount(0)
    }
  }, [])

  useEffect(() => {
    loadFavoritesCount()
    window.addEventListener('favorite-change', loadFavoritesCount)

    return () => {
      window.removeEventListener('favorite-change', loadFavoritesCount)
    }
  }, [loadFavoritesCount])

  useEffect(() => {
    const loadOrdersCount = async () => {
      try {
        const res = await fetch('/api/orders?limit=100', {
          credentials: 'include',
          cache: 'no-store',
        })
        if (!res.ok) return
        const data = await res.json()
        const docs = data.docs || []
        setOrdersTotal(data.totalDocs ?? docs.length)
        setOrdersTransit(
          docs.filter((o: { status: string }) =>
            ['processing', 'shipped'].includes(o.status),
          ).length,
        )
      } catch (error) {
        console.error('Error contando pedidos:', error)
      }
    }
    loadOrdersCount()
    window.addEventListener('order-change', loadOrdersCount as EventListener)

    return () => {
      window.removeEventListener('order-change', loadOrdersCount as EventListener)
    }
  }, [])

  return (
    <div>
      <div className="stat-tiles">
        <div className="stat-tile">
          <strong>{ordersTotal}</strong>
          <span>Pedidos totales</span>
        </div>

        <div className="stat-tile">
          <strong>{ordersTransit}</strong>
          <span>En camino</span>
        </div>

        <div className="stat-tile">
          <strong>{favoritesCount}</strong>
          <span>Favoritos</span>
        </div>
      </div>
    </div>
  )
}
