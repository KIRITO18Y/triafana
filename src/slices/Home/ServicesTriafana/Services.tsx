import './servicesTriafana.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopCode, faCode, faRobot } from '@fortawesome/free-solid-svg-icons'

export const ServicesTriafana = () => {
  return (
    <section className="serviceProducto">
      <div className="section-head">
        <div>
          <span className="eyebrow-service">Servicios TRIAFANA</span>
          <h1 className="title-services">Más que una tienda</h1>
        </div>
        <Link className="serviceLink" href="/services">
          Conocer servicios →
        </Link>
      </div>

      <div className="grid cols-3">
        <Link href="/services" className="service-card">
          <div className="ic">
            <FontAwesomeIcon icon={faLaptopCode} />
          </div>
          <h3>Diseño Web</h3>
          <p>Landing pages rápidas y persuasivas, diseñadas para convertir visitas en clientes.</p>
        </Link>

        <Link href="/services" className="service-card">
          <div className="ic">
            <FontAwesomeIcon icon={faCode} />
          </div>
          <h3>Plataformas a Medida</h3>
          <p>Desarrollo de plataformas web personalizadas, escalables y a la medida de tu negocio.</p>
        </Link>
        <Link href="/services" className="service-card">
          <div className="ic">
            <FontAwesomeIcon icon={faRobot} />
          </div>
          <h3>Automatización con IA</h3>
          <p>Flujos y asistentes inteligentes que optimizan procesos y ahorran tiempo.</p>
        </Link>
      </div>
    </section>
  )
}
