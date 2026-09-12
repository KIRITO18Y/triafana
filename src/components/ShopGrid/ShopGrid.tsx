import './ShopGrid.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import ProductCard from '@/app/(frontend)/Product/ProductCard/ProductCard'
import SortSelect from '../SortSelect/SortSelect'

type Props = {
  category?: string
  subcategory?: string
  sort?: string
}

export async function ShopGrid({ category, subcategory, sort }: Props) {
  const payload = await getPayload({
    config,
  })

  let subcategoryId: string | number | undefined
  if (subcategory) {
    const result = await payload.find({
      collection: 'subcategories',
      where: {
        slug: {
          equals: subcategory,
        },
      },
      limit: 1,
    })

    const found = result.docs[0]

    if (found) {
      subcategoryId = found.id
    }
  }

  if (subcategory && !subcategoryId) {
    return (
      <div>
        <div className="shop-toolbar">
          <span>0 Productos</span>
          <SortSelect />
        </div>
        <div className="no-products">
          <h3>No hay productos</h3>
        </div>
      </div>
    )
  }

  const where: any = {}
  if (category) {
    where.category = {
      equals: category.toLowerCase(),
    }
  }

  if (subcategoryId !== undefined) {
    where.subcategory = {
      equals: subcategoryId,
    }
  }

  const products = await payload.find({
    collection: 'products',
    where,
    limit: 30,
    sort: sort === 'asc' ? 'price' : sort === 'desc' ? '-price' : undefined,
  })

  return (
    <>
      <div className="shop-toolbar">
        <span>
          {products.totalDocs} {products.totalDocs === 1 ? 'Producto' : 'Productos'}
        </span>

        <SortSelect />
      </div>

      {products.docs.length > 0 ? (
        <div className="product-grid">
          {products.docs.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <h3>No hay productos</h3>
          <p>No encontramos productos.</p>
        </div>
      )}
    </>
  )
}
