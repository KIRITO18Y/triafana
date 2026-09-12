import './Footer.css'
import Link from 'next/link'
import Logo from '../Logo/Logo'
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa'

export const Footer = () => {
  return (
    <div className="footer-inner">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <Link className="brand" href="/">
              <Logo width={40} height={40} className="trifa-logo" />
              <b>TRIAFANA</b>
            </Link>
          </div>

          <p>
            Tecnología, cosmetiquería y moda en un solo lugar. Profesional y futurista, con pagos
            seguros.
          </p>

          <div className="socials">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>
        </div>

        <div>
          <h4>Categorías</h4>

          <Link href="/tecnology">Tecnología</Link>

          <Link href="/cosmeticsShop">Cosmetiquería</Link>

          <Link href="/clothes">Ropa</Link>

          <Link href="/store">Promociones</Link>
        </div>

        <div>
          <h4>Ayuda</h4>

          <Link href="/contact">Contacto</Link>

          <Link href="#">Envíos y entregas</Link>

          <Link href="#">Devoluciones</Link>

          <Link href="#">Preguntas frecuentes</Link>
        </div>

        <div>
          <h4>Recibe ofertas</h4>
          <p>Suscríbete y entérate de promociones y lanzamientos.</p>
          <form className="newsletter">
            <input type="email" placeholder="tu@correo.com" aria-label="Correo" className='footer-input' />
            <button className="footer btn-secondary" type="submit">Unirme</button>
          </form>
        </div>
      </div>

      <div className="footer-footer">
        <span>© {new Date().getFullYear()} TRIAFANA Store · Hecho con PayloadCMS</span>
        <span>Términos · Privacidad · Política de cookies</span>
      </div>
    </div>
  )
}
