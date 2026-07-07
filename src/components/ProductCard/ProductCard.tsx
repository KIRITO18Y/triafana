'use client'

import './ProductCard.css'
import { useCart } from '@/context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

type Props = {
  product: any
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart()
  const router = useRouter()

  const formatPrice = (price: number) => {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  }

  return (
    <div className="product-card" onClick={() => router.push(`/Product/${product.id}`)}>
      <div className="product-image">
        <img src={product.image?.url || '/placeholder.png'} alt={product.name} />

        {product.featured && <span className="badge">Destacado</span>}

        <button className="fav" onClick={(e) => e.stopPropagation()} />
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

        <h3>{product.name}</h3>

        <div className="rating">
          ⭐⭐⭐⭐⭐
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
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
