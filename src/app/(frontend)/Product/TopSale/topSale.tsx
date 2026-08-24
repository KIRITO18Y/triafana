import './topSale.css'

export const TopSale = () => {
  return (
    <div className="topsale-container">
      <div className="topsale-header">
        <div>
          <span className="eyebro-topsale">Top ventas</span>
          <h1 className="topsale-title">Productos más vendidos</h1>
        </div>
        <a href="" className="topsale-a">
          Ver más →
        </a>
      </div>
      <div className="topsale-product"></div>
    </div>
  )
}
