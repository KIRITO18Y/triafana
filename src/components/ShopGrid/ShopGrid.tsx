import './ShopGrid.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import ProductCard from '@/components/ProductCard/ProductCard'
import SortSelect from '../SortSelect/SortSelect'

type Props = {
  category?: string
  sort?: string
}

export async function ShopGrid({ category, sort }: Props) {
  const payload = await getPayload({
    config,
  })

  const products = await payload.find({
    collection: 'products',

    sort: sort === 'asc' ? 'price' : sort === 'desc' ? '-price' : undefined,

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
        <SortSelect />
      </div>

      <div className="product-grid">
        {products.docs.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
