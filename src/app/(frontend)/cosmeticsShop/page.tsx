import './cosmeticsShop.css'
import Filters from '@/components/Filters/Filters'
import { ShopGrid } from '@/components/ShopGrid/ShopGrid'
import CatalogMenu from '@/components/CategoryMenu/CatalogMenu'
import { promises } from 'dns'

type Props = {
  searchParams: Promise<{
    sort?: string
  }>
}

export default async function CosmeticsShoppage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <div className="CosmeticsContainer">
      <section className="page-head">
        <nav className="breadcrumb">
          <a href="/">Inicio</a>/<span>Cosmetiquería</span>
        </nav>
        <h1 className="page-title">Cosmetiquería</h1>
        <p className="lead">Explora cosmetiquería: cabello, perfumes, piel, salud, vitaminas.</p>
      </section>

      <div className="chip-row">
        <CatalogMenu active={'cosmetiqueria'} />
      </div>

      <section className="Cosmetics-shop">
        <Filters />
        <div>
          <ShopGrid category="cosmetiqueria" sort={params.sort} />
        </div>
      </section>
    </div>
  )
}
