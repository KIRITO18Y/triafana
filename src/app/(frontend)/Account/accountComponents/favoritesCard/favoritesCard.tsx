'use client'
import './favoritesCard.css'
import { useCallback, useEffect, useState } from 'react'
import ProductCard from '@/app/(frontend)/Product/ProductCard/ProductCard'

type Favorite = {
  id: number
  product: any
}

export const FavoritesCard = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true)

      const res = await fetch('/api/favorites?depth=2', {
        credentials: 'include',
        cache: 'no-store',
      })

      if (!res.ok) {
        throw new Error('No se pudieron cargar los favoritos')
      }

      const data = await res.json()

      setFavorites(data.docs || [])
    } catch (error) {
      console.error('Error cargando favoritos:', error)
      setFavorites([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFavorites()
    window.addEventListener('favorite-change', loadFavorites)

    return () => {
      window.removeEventListener('favorite-change', loadFavorites)
    }
  }, [loadFavorites])

  return (
    <div className="favorites-card">
      <h3 className="favorites-title">Mis favoritos</h3>

      {loading ? (
        <p>Cargando favoritos...</p>
      ) : favorites.length === 0 ? (
        <div className="favorites-empty">
          <p>No tienes productos favoritos.</p>

          <span>Agrega productos usando el ❤️</span>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((favorite) => {
            const product = favorite.product

            if (!product) {
              return null
            }

            return <ProductCard key={favorite.id} product={product} />
          })}
        </div>
      )}
    </div>
  )
}
