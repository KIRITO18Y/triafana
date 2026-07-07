import './clothes.css'
import CatalogMenu from '@/components/CategoryMenu/CatalogMenu'
import Filters from '@/components/Filters/Filters'
import { ShopGrid } from '@/components/ShopGrid/ShopGrid'
const Clothespage = () => {
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
      <section className="shop-layout">
        <Filters />
        <div>
          <ShopGrid category="ropa" />
        </div>
      </section>
    </div>
  )
}

export default Clothespage
