import './ProductDetail.css'
import { getPayload } from 'payload'
import config from '@/payload.config'
import ProductCard from '@/components/ProductCard/ProductCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faShieldHalved, faTruck } from '@fortawesome/free-solid-svg-icons'
import { Product } from '@/payload-types'
import AddToCartButton from '@/components/AddToCartButton'
import Link from 'next/link'
import ProductActions from '@/components/ProductActions/ProductActions'

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const payload = await getPayload({
    config,
  })

  const product = await payload.findByID({
    collection: 'products',
    id,
    depth: 1,
  })

  const relatedProducts = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 4,
    where: {
      and: [
        {
          category: {
            equals: product.category,
          },
        },
        {
          id: {
            not_equals: id,
          },
        },
      ],
    },
  })

  const formatPrice = (prince: number) => {
    return `$${prince.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  }

  return (
    <main>
      <nav className="nav-breadcrumb">
        <a href="/">Inicio</a>/<a href="/clothes">{product.category}</a>/<span>{product.name}</span>
      </nav>
      <div className="container-detail">
        <div className="container-img">
          <img
            src={
              typeof product.image === 'object'
                ? product.image.url || '/placeholder.png'
                : '/placeholder.png'
            }
            alt={product.name}
            className="detail-img"
          />
        </div>

        <section>
          <div className="pdp-info">
            <span className="product-category">{product.category}</span>
            <h1>{product.name}</h1>
            <div className=" ">
              ⭐⭐⭐⭐⭐
              <span>4.8</span>
            </div>

            <div className="price-detail">
              <span className="detail-price">{formatPrice(Number(product.price) || 0)}</span>

              {product.oldPrice && (
                <span className="detail-oldprice">{formatPrice(Number(product.oldPrice))}</span>
              )}
            </div>

            <div>
              <p className="detail-trifana">
                Producto de alta calidad seleccionado por TRIAFANA. Garantía oficial, envío rápido y
                soporte postventa.
              </p>
            </div>

            <div className="quantity-section">
              <h2>Cantidad</h2>
              <div className="quantity-container">
                <button className="btn-quantity">-</button>
                <span className="quantity">1</span>
                <button className="btn-quantity">+</button>
              </div>
            </div>

            <div className="btn-container">
              <ProductActions product={product} />
            </div>
          </div>

          <div className="text-detail">
            <div className="detail-shipping">
              <FontAwesomeIcon icon={faTruck} className="detail-icon" />
              <span className="shipping-span">Envío gratis en compras superiores a $200.000 </span>
            </div>
            <div className="detail-shipping">
              <FontAwesomeIcon icon={faShieldHalved} className="detail-icon" />
              <span className="shipping-span">Pago 100% seguro · Garantía oficial</span>
            </div>

            <div className="detail-shipping">
              <FontAwesomeIcon icon={faBox} className="detail-icon" />
              <span className="shipping-span">Devolución gratis en 30 días</span>
            </div>
          </div>
        </section>

        <section className="description-section">
          <div className="detail-description">
            <h2>Descripción</h2>
            <p className="description-text">
              En TRIAFANA seleccionamos cada producto pensando en calidad, durabilidad y la mejor
              experiencia. Este artículo incluye garantía oficial del fabricante y soporte postventa
              local. Diseño profesional y futurista, ideal para quienes buscan rendimiento sin
              renunciar al estilo.
            </p>
            <div className="grid cols-3">
              <div className="specs-title">
                <h3>Garantía</h3>
                <span className="grid-span">12 meses oficiales</span>
              </div>
              <div className="specs-title">
                <h3>Envío</h3>

                <span className="grid-span">24–48h a nivel nacional</span>
              </div>
              <div className="specs-title">
                <h3>Pagos</h3>
                <span className="grid-span">1Tarjeta, PSE, contraentrega</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-related">
          <div className="section-related-header">
            <div>
              <span className="detail-eyebrow">También te puede gustar</span>
              <h2>Productos relacionados</h2>
            </div>
            <div></div>
          </div>
          <div className="product-grid">
            {relatedProducts.docs.length > 0 ? (
              relatedProducts.docs.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))
            ) : (
              <p className="no-products">No hay productos relacionados.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
