import '../Services/services.css'

export const ServiceProducto = () => {
  return (
    <section className="serviceProducto">
      <div className="section-head">
        <div>
          <span className="eyebrow">Servicios TRIAFANA</span>
          <h1>Más que una tienda</h1>
        </div>
        <a className="link" href="/Services">
          Conocer servicios →
        </a>
      </div>
      <div className="grid cols-3">
        <a href="/Services" className="service-card">
          <div className="ic">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <h3>Diseño Web</h3>
          <p>Sitios y tiendas a medida, rápidos y centrados en conversión.</p>
        </a>
        <a href="/Services" className="service-card">
          <div className="ic">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 11l18-7-7 18-2.5-7.5L3 11z" />
            </svg>
          </div>
          <h3>Social Media</h3>
          <p>Gestión de redes y contenido que conecta con tu audiencia.</p>
        </a>
        <a href="/Services" className="service-card">
          <div className="ic">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 3v18h18" />
              <path d="M7 14l3-4 3 3 5-7" />
            </svg>
          </div>
          <h3>Marketing</h3>
          <p>Estrategias de crecimiento medibles con Google Analytics.</p>
        </a>
      </div>
    </section>
  )
}
