'use client'

import './ProductCard.css'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '@/context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  product: any
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart()
  const router = useRouter()

  const [isFavorite, setIsFavorite] = useState(false)
  const [loadingFavorite, setLoadingFavorite] = useState(false)
  const shortName = product.name.length > 20 ? `${product.name.slice(0, 20)}...` : product.name

  const formatPrice = (price: number) => {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  }

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const userRes = await fetch('/api/customers/me', {
          credentials: 'include',
          cache: 'no-store',
        })

        if (!userRes.ok) {
          return
        }

        const userData = await userRes.json()

        if (!userData?.user) {
          return
        }

        const favoritesRes = await fetch(`/api/favorites?where[product][equals]=${product.id}`, {
          credentials: 'include',
          cache: 'no-store',
        })

        if (!favoritesRes.ok) {
          return
        }

        const favoritesData = await favoritesRes.json()

        setIsFavorite(favoritesData.totalDocs > 0)
      } catch (error) {
        console.error('Error comprobando favorito:', error)
      }
    }

    checkFavorite()
  }, [product.id])

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (loadingFavorite) {
      return
    }

    try {
      setLoadingFavorite(true)
      const userRes = await fetch('/api/customers/me', {
        credentials: 'include',
        cache: 'no-store',
      })

      if (!userRes.ok) {
        toast.error('Debes iniciar sesión para agregar favoritos', {
          toastId: 'favorite-login-toast',
        })

        setTimeout(() => {
          router.push('/login')
        }, 1500)

        return
      }

      const userData = await userRes.json()

      if (!userData?.user) {
        toast.error('Debes iniciar sesión para agregar favoritos', {
          toastId: 'favorite-login-toast',
        })

        setTimeout(() => {
          router.push('/login')
        }, 1500)

        return
      }
      const favoriteRes = await fetch(`/api/favorites?where[product][equals]=${product.id}`, {
        credentials: 'include',
        cache: 'no-store',
      })

      if (!favoriteRes.ok) {
        throw new Error('No se pudieron consultar los favoritos')
      }

      const favoriteData = await favoriteRes.json()
      if (favoriteData.totalDocs > 0) {
        const favoriteId = favoriteData.docs[0].id

        const deleteRes = await fetch(`/api/favorites/${favoriteId}`, {
          method: 'DELETE',
          credentials: 'include',
        })

        if (!deleteRes.ok) {
          throw new Error('No se pudo quitar de favoritos')
        }

        setIsFavorite(false)

        toast.info(`"${shortName}" eliminado de favoritos`, {
          toastId: 'favorite-toast',
        })
      } else {
        const createRes = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            product: product.id,
            user: userData.user.id,
          }),
        })

        if (!createRes.ok) {
          const errorData = await createRes.json()

          throw new Error(errorData?.message || 'No se pudo agregar a favoritos')
        }

        setIsFavorite(true)

        toast.success(`"${shortName}" agregado a favoritos`, {
          toastId: 'favorite-toast',
        })
      }
    } catch (error) {
      console.error('Error con favoritos:', error)

      toast.error('No se pudo actualizar favoritos', {
        toastId: 'favorite-error-toast',
      })
    } finally {
      setLoadingFavorite(false)
    }
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
            disabled={loadingFavorite}
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
