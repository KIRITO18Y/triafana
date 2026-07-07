import CatalogMenu from '@/components/CategoryMenu/CatalogMenu'
import './store.css'

import Filters from '@/components/Filters/Filters'
import { ShopGrid } from '@/components/ShopGrid/ShopGrid'

const StorePage = () => {
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
        <CatalogMenu active={'todo'} />
      </div>
      <section className="shop-layout">
        <Filters />
        <div>
          <ShopGrid />
        </div>
      </section>
    </div>
  )
}

export default StorePage
