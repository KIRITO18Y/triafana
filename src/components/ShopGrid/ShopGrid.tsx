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

    console.log('SUBCATEGORY SLUG:', subcategory)
    console.log('SUBCATEGORY FOUND:', found)

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
          <p>No encontramos productos para esta subcategoría.</p>
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

  console.log('WHERE FINAL:', where)
  const products = await payload.find({
    collection: 'products',
    where,
    sort: sort === 'asc' ? 'price' : sort === 'desc' ? '-price' : undefined,
  })

  console.log('TOTAL PRODUCTS:', products.totalDocs)
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
          <p>No encontramos productos para esta subcategoría.</p>
        </div>
      )}
    </>
  )
}
