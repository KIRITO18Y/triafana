import './ServicesPage.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn, faChartLine, faLaptopCode } from '@fortawesome/free-solid-svg-icons'

const ServicesPage = () => {
  return (
    <div className="service-contianer">
      <div className="services-header">
        <section className="page-head">
          <nav className="breadcrumb">
            <Link href="/">Inicio</Link> / <span>Servicios</span>
          </nav>
        </section>

        <section className="hero">
          <div className="hero-card">
            <div className="hero-copy">
              <span className="eyebrowService">Servicios TRIAFANA</span>
              <h1>Impulsamos tu marca, no solo vendemos productos</h1>
              <p className="lead">
                Combinamos diseño, contenido y datos para hacer crecer tu negocio digital. Medimos
                resultados con Google Analytics.
              </p>
              <div className="hero-actions">
                <Link href="/contacto" className="btn btn-primary btn-lg">
                  Solicitar cotización
                </Link>

                <a href="#servicios" className="btn btn-ghost btn-lg">
                  Ver servicios
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="grid cols-3">
            <div className="service-card">
              <div className="ic">
                <FontAwesomeIcon icon={faLaptopCode} />
              </div>
              <h3>Diseño Web</h3>
              <p>
                Sitios y e-commerce a medida con PayloadCMS, optimizados para velocidad, SEO y
                conversión.
              </p>
              <ul>
                <li>✓ Diseño responsive y accesible</li>
                <li>✓ Integración de pagos</li>
                <li>✓ Panel de administración</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="ic">
                <FontAwesomeIcon icon={faBullhorn} />
              </div>
              <h3>Social Media</h3>
              <p>
                Gestión de redes, calendario de contenido y comunidad para conectar con tu
                audiencia.
              </p>

              <ul className="services-list">
                <li>✓ Estrategia de contenido</li>
                <li>✓ Diseño de piezas</li>
                <li>✓ Reportes mensuales</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="ic">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <h3>Marketing</h3>
              <p>
                Campañas de pauta y growth con foco en retorno. Medición y optimización continua.
              </p>
              <ul className="services-list">
                <li>✓ Google & Meta Ads</li>
                <li>✓ Analítica y embudos</li>
                <li>✓ Email marketing</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrowService">Cómo trabajamos</span>
              <h2>Un proceso claro y medible</h2>
            </div>
          </div>

          <div className="grid cols-4">
            <div className="info-card">
              <div className="ic">1</div>
              <h3>Diagnóstico</h3>
              <p>Entendemos tu marca, metas y audiencia.</p>
            </div>

            <div className="info-card">
              <div className="ic">2</div>
              <h3>Estrategia</h3>
              <p>Definimos plan, canales y KPIs.</p>
            </div>

            <div className="info-card">
              <div className="ic">3</div>
              <h3>Ejecución</h3>
              <p>Diseñamos, construimos y publicamos.</p>
            </div>

            <div className="info-card">
              <div className="ic">4</div>
              <h3>Medición</h3>
              <p>Optimizamos con datos reales.</p>
            </div>
          </div>
        </section>

        <section className="section-promo">
          <div className="promo">
            <div>
              <span className="promo-eyebrow">¿Listo para crecer?</span>
              <h2>Cuéntanos tu proyecto</h2>
              <p>
                Agenda una asesoría gratuita y diseñemos juntos la mejor estrategia para tu marca.
              </p>
              <div className="actions">
                <Link href="/contacto" className="btn btn-primary btn-lg">
                  Contactar ahora
                </Link>
              </div>
            </div>
            <div className="icon-promo">🚀</div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ServicesPage
