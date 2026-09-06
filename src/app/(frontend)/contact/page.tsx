import './contact.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'

export default function Contact() {
  return (
    <div className="contact-container">
      <section className="contact-head">
        <nav className="contact-breadcrumb">
          <a href="/">Inicio</a>/<span>Contacto</span>
        </nav>
        <h1 className="contact-title">Hablemos</h1>
        <p className="contact-p">¿Tienes una pregunta sobre un producto o quieres cotizar un servicio? Escríbenos.</p>
      </section>
      <section className="contact-section">
        <div className="contact-split">
          <div className="form-card">
            <h3 className="form-h3">Envianos un mensaje</h3>
            <div className="form-grid">
              <div className="field">
                <label>Nombre</label> <input type="text" placeholder="Tu nombre" />
              </div>
              <div className="field">
                <label>Correo</label>
                <input type="email" placeholder="tu@correo.com" />
              </div>
              <div className="field full">
                <label>Asunto</label>
                <select>
                  <option>Consulta sobre un producto</option>
                  <option>Estado de mi pedido</option>
                  <option>Cotizar un servicio</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="field full">
                <label>Texto</label>
                <textarea rows={5} placeholder="Cuéntanos en qué podemos ayudarte…"></textarea>
              </div>
            </div>
            <div className='btn-enviar'>
              <button className="btn contact-btn btn-lg">Enviar mensaje</button>
            </div>
          </div>
          <div className="info-grid">
            <div className="info-card">
              <div className="contact-ic">
                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              </div>
              <h3 className="card-h3">Correo</h3>
              <p>
                hola@triafana.com <br />
                soporte@triafana.com
              </p>
            </div>

            <div className="info-card">
              <div className="contact-ic">
                <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              </div>
              <h3 className="card-h3">Teléfono / WhatsApp</h3>
              <p>
                +57 300 000 0000 <br />
                Lun–Sáb · 8:00–18:00
              </p>
            </div>
            <div className="info-card">
              <div className="contact-ic">
                <FontAwesomeIcon icon={faLocationDot} className="contact-icon" />
              </div>
              <h3 className="card-h3">Correo</h3>
              <p>
                Bogotá, Colombia <br /> Envíos a todo el país
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
