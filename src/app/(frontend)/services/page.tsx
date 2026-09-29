import './services-page.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faRobot, faLaptopCode } from '@fortawesome/free-solid-svg-icons'

const ServicesPage = () => {
  return (
    <div className="service-contianer">
      <div className="services-header">
        <section className="service-head">
          <nav className="service-breadcrumb">
            <a className="service-a" href="/">
              Inicio{' '}
            </a>
            / <span>Servicios</span>
          </nav>
        </section>
        <section className="hero">
          <div className="hero-card">
            <div className="hero-copy">
              <span className="eyebrowService">Servicios TRIAFANA</span>
              <h1>Impulsamos tu marca, no solo vendemos productos</h1>
              <p className="lead">
                Diseñamos landing pages que convierten, construimos plataformas web a tu medida y
                automatizamos procesos con inteligencia artificial.
              </p>
              <div className="hero-actions">
                <Link href="/contact" className="btn btn-primary btn-lg">
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
          <div className="service-grid service-cols-3">
            <div className="service-card">
              <div className="service-ic">
                <FontAwesomeIcon icon={faLaptopCode} />
              </div>
              <h3>Diseño Web</h3>
              <p>
                Landing pages rápidas y persuasivas, optimizadas para velocidad, SEO y
                conversión.
              </p>
              <ul>
                <li>✓ Diseño responsive y accesible</li>
                <li>✓ Copy orientado a conversión</li>
                <li>✓ Integración de formularios y pagos</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-ic">
                <FontAwesomeIcon icon={faCode} />
              </div>
              <h3>Plataformas a Medida</h3>
              <p>
                Desarrollo de plataformas y sistemas web personalizados, escalables y adaptados a
                tu operación.
              </p>

              <ul className="services-list">
                <li>✓ Arquitectura a medida</li>
                <li>✓ Paneles de administración</li>
                <li>✓ Integraciones con tus sistemas</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-ic">
                <FontAwesomeIcon icon={faRobot} />
              </div>
              <h3>Automatización con IA</h3>
              <p>
                Flujos y asistentes inteligentes que optimizan procesos y ahorran tiempo en tu
                negocio.
              </p>
              <ul className="services-list">
                <li>✓ Chatbots y asistentes IA</li>
                <li>✓ Automatización de procesos</li>
                <li>✓ Integración con tus herramientas</li>
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
              <div className="info-ic">1</div>
              <h3>Diagnóstico</h3>
              <p>Entendemos tu marca, metas y audiencia.</p>
            </div>

            <div className="info-card">
              <div className="info-ic">2</div>
              <h3>Estrategia</h3>
              <p>Definimos plan, canales y KPIs.</p>
            </div>

            <div className="info-card">
              <div className="info-ic">3</div>
              <h3>Ejecución</h3>
              <p>Diseñamos, construimos y publicamos.</p>
            </div>

            <div className="info-card">
              <div className="info-ic">4</div>
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
                <Link href="/contact" className="btn btn-primary btn-lg">
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
