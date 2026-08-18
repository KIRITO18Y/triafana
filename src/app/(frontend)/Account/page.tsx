import { BuysCard } from './accountComponents/BuysCard/BuysCard'
import { DataCard } from './accountComponents/DataCard/DataCard'

export default function AccountPage() {
  return (
    <>
      <div className="stat-tiles">
        <div className="stat-tile">
          <strong>0</strong>
          <span>Pedidos totales</span>
        </div>

        <div className="stat-tile">
          <strong>3</strong>
          <span>En camino</span>
        </div>

        <div className="stat-tile">
          <strong>0</strong>
          <span>Favoritos</span>
        </div>
      </div>

      <section>
        <BuysCard />
        <DataCard />
      </section>
    </>
  )
}
