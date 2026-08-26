import './servicesTriafana.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopCode, faBullhorn, faChartLine } from '@fortawesome/free-solid-svg-icons'

export const ServicesTriafana = () => {
  return (
    <section className="serviceProducto">
      <div className="section-head">
        <div>
          <span className="eyebrow-service">Servicios TRIAFANA</span>

          <h1 className="title-services">Más que una tienda</h1>
        </div>

        <Link className="serviceLink" href="/Services">
          Conocer servicios →
        </Link>
      </div>

      <div className="grid cols-3">
        <Link href="/Services" className="service-card">
          <div className="ic">
            <FontAwesomeIcon icon={faLaptopCode} />
          </div>

          <h3>Diseño Web</h3>

          <p>Sitios y tiendas a medida, rápidos y centrados en conversión.</p>
        </Link>

        <Link href="/Services" className="service-card">
          <div className="ic">
            <FontAwesomeIcon icon={faBullhorn} />
          </div>

          <h3>Social Media</h3>

          <p>Gestión de redes y contenido que conecta con tu audiencia.</p>
        </Link>
        <Link href="/Services" className="service-card">
          <div className="ic">
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <h3>Marketing</h3>
          <p>Estrategias de crecimiento medibles con Google Analytics.</p>
        </Link>
      </div>
    </section>
  )
}
