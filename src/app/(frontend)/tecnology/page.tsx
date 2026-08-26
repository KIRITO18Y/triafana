import './tecnology.css'
import CatalogMenu from '@/components/CategoryMenu/CatalogMenu'
import Filters from '@/components/Filters/Filters'
import { ShopGrid } from '@/components/ShopGrid/ShopGrid'

type Props = {
  searchParams: Promise<{
    sort?: string
  }>
}

export default async function TecnologyPage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <div className="tecnologyContainer">
      <section className="page-head">
        <nav className="breadcrumb">
          <a href="/">Inicio</a>/<span>Tecnología</span>
        </nav>

        <h1 className="page-title">Tecnología</h1>
        <p className="lead">Explora computadores, celulares, audio y accesorios.</p>
      </section>

      <div className="chip-row">
        <CatalogMenu active="tecnologia" />
      </div>

      <section className="tecnology-shop">
        <Filters />
        <div>
          <ShopGrid category="tecnologia" sort={params.sort} />
        </div>
      </section>
    </div>
  )
}
