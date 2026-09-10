import CatalogMenu from '@/components/CategoryMenu/CatalogMenu'
import './store.css'
import Filters from '@/components/Filters/Filters'
import MobileFilters from '@/components/Filters/MobileFilters/MobileFilters'
import { ShopGrid } from '@/components/ShopGrid/ShopGrid'

type Props = {
  searchParams: Promise<{
    sort?: string
    subcategory?: string
  }>
}

export default async function StorePage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <div className="storeContainer">
      <section className="page-head">
        <nav className="breadcrumb">
          <a href="/">Inicio</a> / <span>Tienda</span>
        </nav>

        <h1 className="page-title">Tienda</h1>
        <p className="lead">Explora todo el catálogo de TRIAFANA.</p>
      </section>

      <div className="chip-row">
        <CatalogMenu active="todo" />
      </div>

      <MobileFilters category={'category'} />

      <section className="store-shop">
        <div className="desktop-filters">
          <Filters />
        </div>
        <div className="store-products">
          <ShopGrid subcategory={params.subcategory} sort={params.sort} />
        </div>
      </section>
    </div>
  )
}
