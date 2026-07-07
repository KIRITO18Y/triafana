import './cosmeticsShop.css'
import Filters from '@/components/Filters/Filters'
import { ShopGrid } from '@/components/ShopGrid/ShopGrid'
import CatalogMenu from '@/components/CategoryMenu/CatalogMenu'

const CosmeticsShoppage = () => {
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
      <section className="shop-layout">
        <Filters />
        <div>
          <ShopGrid category="cosmetiqueria" />
        </div>
      </section>
    </div>
  )
}

export default CosmeticsShoppage
