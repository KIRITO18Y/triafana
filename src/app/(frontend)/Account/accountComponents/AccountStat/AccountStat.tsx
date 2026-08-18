import './accountStat.css'
export const AccountStat = () => {
  return (
    <div>
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
    </div>
  )
}
