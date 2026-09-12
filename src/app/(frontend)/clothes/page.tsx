import './clothes.css'
import CatalogMenu from '@/components/CategoryMenu/CatalogMenu'
import Filters from '@/components/Filters/Filters'
import MobileFilters from '@/components/Filters/MobileFilters/MobileFilters'
import { ShopGrid } from '@/components/ShopGrid/ShopGrid'

type Props = {
  searchParams: Promise<{
    sort?: string
    subcategory?: string
  }>
}

export default async function Clothespage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <div className="clothesContainer">
      <section className="page-head">
        <nav className="breadcrumb">
          <a href="/">Inicio</a>/<span>Ropa</span>
        </nav>
        <h1 className="page-title">Ropa</h1>
        <p className="lead">Explora ropa para caballeros, niños y damas para cada ocasión.</p>
      </section>
      <div className="chip-row">
        <CatalogMenu active={'ropa'} />
      </div>
      <MobileFilters category="ropa" />
      <section className="clothes-shop">
        <div className="desktop-filters">
          <Filters category="ropa" />
        </div>

        <div>
          <ShopGrid category="ropa" subcategory={params.subcategory} sort={params.sort} />
        </div>
      </section>
    </div>
  )
}
