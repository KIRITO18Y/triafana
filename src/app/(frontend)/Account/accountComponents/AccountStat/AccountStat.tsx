'use client'

import './accountStat.css'
import { useCallback, useEffect, useState } from 'react'
export const AccountStat = () => {
  const [favoritesCount, setFavoritesCount] = useState(0)

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

  return (
    <div>
      <div className="stat-tiles">
        <div className="stat-tile">
          <strong>0</strong>
          <span>Pedidos totales</span>
        </div>

        <div className="stat-tile">
          <strong>3</strong>
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
