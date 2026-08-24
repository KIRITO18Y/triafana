import './promo.css'

export const Promo = () => {
  return (
    <section className="promo-section" style={{ paddingTop: 0 }}>
      <div className="promo-container">
        <div>
          <span className="eyebro-promo" style={{ color: '#cdeef2' }}>
            Promociones
          </span>
          <h2 className="promo-title">Hasta 30% en tecnología seleccionada</h2>
          <p className="promo-p">
            Renueva tus equipos esta temporada. Ofertas por tiempo limitado en computadores, audio y
            accesorios.
          </p>
          <div className="promo-btn">
            <a href="/tecnology" className="btn promo-primary">
              Ver ofertas
            </a>
            <a href="" className="btn promo-ghost btn-a">
              Todas las promos
            </a>
          </div>
        </div>
        <div className="promo-icon">🔥</div>
      </div>
    </section>
  )
}
