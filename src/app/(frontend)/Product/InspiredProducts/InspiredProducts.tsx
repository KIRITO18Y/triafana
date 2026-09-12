'use client'

import ProductCard from '../ProductCard/ProductCard'
import './inspiredProducts.css'
import { useEffect, useState } from 'react'
export const InspiredProducts = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(
          '/api/products?limit=4&sort=-createdAt&depth=1',
          {
            cache: 'no-store',
          },
        )

        if (!res.ok) {
          throw new Error('No se pudieron cargar los productos')
        }

        const data = await res.json()

        setProducts(data.docs || [])
      } catch (error) {
        console.error('Error cargando productos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading || products.length === 0) {
    return null
  }

  return (
    <section className="inspiredProducts">
      <div className='inspired-head'>
        <div className="inpired-infor">
          <div>
            <span className="eyebro-inpir">Para ti</span>
            <h1 className="inspireP-title">
              Inspirado en lo último que viste
            </h1>
          </div>
          <a className="link" href="/store">
            Ver más →
          </a>
        </div>

        <div className="inpired-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  )
}