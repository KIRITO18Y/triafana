'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import './filters.css'
import { FiltersCut } from './FiltersCut/FiltersCut'

type Subcategory = {
  id: string
  name: string
  slug: string
  category: string
}

type FiltersProps = {
  category?: string
}

export default function Filters({ category }: FiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const appliedSubcategories = searchParams.get('subcategory')?.split(',').filter(Boolean) || []
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(appliedSubcategories)

  useEffect(() => {
    const loadSubcategories = async () => {
      try {
        let url = '/api/subcategories?limit=100'

        if (category) {
          url = `/api/subcategories?where[category][equals]=${category}&limit=100`
        }

        const res = await fetch(url, {
          cache: 'no-store',
        })

        if (!res.ok) {
          throw new Error('Error cargando subcategorías')
        }

        const data = await res.json()

        console.log('SUBCATEGORÍAS:', data.docs)

        setSubcategories(data.docs)
      } catch (error) {
        console.error('Error:', error)
        setSubcategories([])
      }
    }

    loadSubcategories()
  }, [category])

  const handleSubcategoryChange = (subcategory: Subcategory) => {
    setSelectedSubcategories((current) => {
      let updated: string[]
      if (current.includes(subcategory.slug)) {
        updated = current.filter((slug) => slug !== subcategory.slug)
      } else {
        updated = [...current, subcategory.slug]
      }

      if (updated.length === 0) {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('subcategory')
        router.push(`?${params.toString()}`)
      }

      return updated
    })
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedSubcategories.length > 0) {
      params.set('subcategory', selectedSubcategories.join(','))
    } else {
      params.delete('subcategory')
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <aside className="filters">
      <h3>Filtros</h3>
      <h4>Subcategoría</h4>

      <div className="sub-list">
        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <label key={subcategory.id} className="filter-opt">
              <input
                type="checkbox"
                value={subcategory.slug}
                checked={selectedSubcategories.includes(subcategory.slug)}
                onChange={() => handleSubcategoryChange(subcategory)}
              />

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

      <div className="filter-group">
        <h4>Tallas</h4>
        <FiltersCut />
      </div>

      <button type="button" className="btn btn-teal btn-block" onClick={handleApplyFilters}>
        Aplicar filtros
      </button>
    </aside>
  )
}
