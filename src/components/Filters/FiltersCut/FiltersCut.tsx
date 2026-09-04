import './filtersCut.css'
import { useState } from 'react'

export const FiltersCut = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const sizes = ['XS', 'S', 'M', 'L', 'XL']

  return (
    <div className="filters-cut">
      {sizes.map((size) => (
        <button
          key={size}
          className={`filter-size ${selectedSize === size ? 'is-active' : ''}`}
          onClick={() => setSelectedSize(selectedSize === size ? null : size)}
        >
          {size}
        </button>
      ))}
    </div>
  )
}
