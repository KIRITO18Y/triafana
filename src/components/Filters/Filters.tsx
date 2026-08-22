'use client'

import { useEffect, useState } from 'react'
import './filters.css'

type Subcategory = {
  id: string
  name: string
}

type FiltersProps = {
  categoryId?: string
}

export default function Filters({ categoryId }: FiltersProps) {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])

  useEffect(() => {
    if (!categoryId) {
      setSubcategories([])
      return
    }

    const loadSubcategories = async () => {
      try {
        const res = await fetch(`/api/categories?where[parent][equals]=${categoryId}`)

        if (!res.ok) {
          throw new Error('Error cargando subcategorías')
        }

        const data = await res.json()

        setSubcategories(data.docs)
      } catch (error) {
        console.error(error)
      }
    }

    loadSubcategories()
  }, [categoryId])

  return (
    <aside className="filters">
      <h3>Filtros</h3>

      <h4>Subcategoría</h4>

      <div className="sub-list">
        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <label key={subcategory.id} className="filter-opt">
              <input type="checkbox" value={subcategory.id} />

              {subcategory.name}
            </label>
          ))
        ) : (
          <p>No hay subcategorías.</p>
        )}
      </div>

      <div className="filter-group">
        <h4>Precio</h4>

        <label className="filter-opt">
          <input type="checkbox" />
          Menos de $100.000
        </label>

        <label className="filter-opt">
          <input type="checkbox" />
          $100.000 – $500.000
        </label>

        <label className="filter-opt">
          <input type="checkbox" />
          $500.000 – $1.500.000
        </label>

        <label className="filter-opt">
          <input type="checkbox" />
          Más de $1.500.000
        </label>
      </div>

      <h4>Talla</h4>

      <div className="size-grid">
        <span className="size">XS</span>
        <span className="size">S</span>
        <span className="size">M</span>
        <span className="size">L</span>
      </div>

      <h4>Color</h4>

      <div className="swatches">
        <span />
        <span />
        <span />
        <span />
      </div>
      <button className="btn btn-teal btn-block">Aplicar filtros</button>
    </aside>
  )
}
