import './tecnology.css'
import CatalogMenu from '@/components/CategoryMenu/CatalogMenu'
import Filters from '@/components/Filters/Filters'
import { ShopGrid } from '@/components/ShopGrid/ShopGrid'

const TecnologyPage = () => {
  return (
    <div className="tecnologyContainer">
      <section className="page-head">
        <h1 className="page-title">Tecnología</h1>
        <p className="lead">Explora computadores, celulares, audio y accesorios.</p>
      </section>
      <div className="chip-row">
        <CatalogMenu active={'tecnologia'} />
      </div>
      <section className="shop-layout">
        <Filters />
        <div>
          <ShopGrid category="tecnologia" />
        </div>
      </section>
    </div>
  )
}

export default TecnologyPage
