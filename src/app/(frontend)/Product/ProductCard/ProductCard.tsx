'use client'
import './ProductCard.css'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { useCart } from '@/context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  product: any
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart()
  const router = useRouter()

  const [isFavorite, setIsFavorite] = useState(false)

  const formatPrice = (price: number) => {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  }

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsFavorite((prev) => !prev)
  }

  return (
    <div className="product-card" onClick={() => router.push(`/Product/${product.id}`)}>
      <div className="product-image">
        <img
          src={product.image?.url || '/placeholder.png'}
          alt={product.name || 'Producto'}
          className="img-prd"
        />
        {product.featured && <span className="badge">Destacado</span>}
        <div className="btn-fav">
          <button
            type="button"
            className={`link-favor ${isFavorite ? 'is-favorite' : ''}`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <FontAwesomeIcon
              icon={isFavorite ? faHeartSolid : faHeartRegular}
              className="icon-fav"
            />
          </button>
        </div>
      </div>

      <div className="product-info">
        <span className="category">
          {product.category === 'tecnologia'
            ? 'TECNOLOGÍA'
            : product.category === 'cosmetiqueria'
              ? 'COSMETIQUERÍA'
              : product.category === 'ropa'
                ? 'ROPA'
                : product.category?.toUpperCase() || 'GENERAL'}
        </span>

        <h3 className="card-name">{product.name}</h3>

        <div className="rating">
          <div className="rating-estre">★★★★★</div>
          <span>4.8</span>
        </div>

        <div className="price">
          <div className="price-oldPrice">
            <span className="span-price">{formatPrice(Number(product.price) || 0)}</span>

            {product.oldPrice && (
              <span className="span-oldPrice">{formatPrice(Number(product.oldPrice))}</span>
            )}
          </div>

          <div className="container-btn">
            <button
              className="price-btn"
              onClick={(e) => {
                e.stopPropagation()

                addToCart({
                  id: product.id,
                  name: product.name,
                  price: Number(product.price),
                  image: product.image?.url || '',
                })
              }}
              aria-label="Agregar al carrito"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
