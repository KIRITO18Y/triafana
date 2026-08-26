import './clothes.css'
import CatalogMenu from '@/components/CategoryMenu/CatalogMenu'
import Filters from '@/components/Filters/Filters'
import { ShopGrid } from '@/components/ShopGrid/ShopGrid'

type Props = {
  searchParams: Promise<{
    sort?: string
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
        <p className="lead">Explora cosmetiquería: cabello, perfumes, piel, salud, vitaminas.</p>
      </section>
      <div className="chip-row">
        <CatalogMenu active={'ropa'} />
      </div>
      <section className="clothes-shop">
        <Filters />
        <div>
          <ShopGrid category="ropa" sort={params.sort} />
        </div>
      </section>
    </div>
  )
}
