import './offers.css'

export const Offers = () => {
  return (
    <div className="offers-container">
      <div className="offers">
        <div>
          <span className="eyebro-offers">ofertas</span>
          <h2 className="offers-title">Promociones de la semana</h2>
        </div>
        <a className="offers-link" href="/tecnology">
          Ver más →
        </a>
      </div>
      <div className="offers-products"></div>
    </div>
  )
}
