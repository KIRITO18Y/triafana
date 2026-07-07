import './ShopGrid.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import ProductCard from '@/components/ProductCard/ProductCard'

type Props = {
  category?: string
}

export async function ShopGrid({ category }: Props) {
  const payload = await getPayload({
    config,
  })

  const products = await payload.find({
    collection: 'products',
    ...(category && {
      where: {
        category: {
          equals: category.toLowerCase(),
        },
      },
    }),
  })

  return (
    <>
      <div className="shop-toolbar">
        <span>{products.totalDocs} Productos</span>
        <select>
          <option>Relevancia</option>
          <option>Precio menor</option>
          <option>Precio Mayor</option>
          <option>Mejor Valorados</option>
        </select>
      </div>
      <div className="product-grid">
        {products.docs.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
