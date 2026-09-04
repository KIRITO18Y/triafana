'use client'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import Filters from '../Filters'

type Props = {
  category: string
}

export default function MobileFilters({ category }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mobile-filters">
      <button
        type="button"
        className={`mobile-filter-icon ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Ocultar filtros' : 'Mostrar filtros'}
      >
        <FontAwesomeIcon icon={faGear} className="mobile-filter" />
        <span>Filtros</span>
      </button>

      {open && (
        <div className="mobile-filter-content">
          <Filters category={category} />
        </div>
      )}
    </div>
  )
}
