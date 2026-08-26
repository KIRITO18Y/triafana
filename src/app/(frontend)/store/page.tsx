import CatalogMenu from '@/components/CategoryMenu/CatalogMenu'
import './store.css'
import Filters from '@/components/Filters/Filters'
import { ShopGrid } from '@/components/ShopGrid/ShopGrid'

type Props = {
  searchParams: Promise<{
    sort?: string
  }>
}

export default async function StorePage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <div className="storeContainer">
      <section className="page-head">
        <nav className="breadcrumb">
          <a href="/">Inicio</a>/<span>Tienda</span>
        </nav>

        <h1 className="page-title">Tienda</h1>
        <p className="lead">Explora todo el catálogo de TRIAFANA.</p>
      </section>

      <div className="chip-row">
        <CatalogMenu active="todo" />
      </div>

      <section className="store-shop">
        <Filters />

        <div>
          <ShopGrid sort={params.sort} />
        </div>
      </section>
    </div>
  )
}
