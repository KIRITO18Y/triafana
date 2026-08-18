import '../TrustStrip/trustStrip.css'

export const TrustStrip = () => {
  return (
    <div className="shoppingCategories-container">
      <div className="trust-strip">
        <div className="trust-item">
          <span className="ic">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="3" width="15" height="13" />
              <path d="M16 8h4l3 3v5h-7" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </span>

          <div>
            <strong>Envío nacional</strong>
            <span>24–48h hábiles</span>
          </div>
        </div>

        <div className="trust-item">
          <span className="ic">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </span>

          <div>
            <strong>Pago seguro</strong>
            <span>Datos cifrados</span>
          </div>
        </div>

        <div className="trust-item">
          <span className="ic">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
              <path d="M3 12h4l2 6 4-12 2 6h4" />
            </svg>
          </span>

          <div>
            <strong>Devolución 30 días</strong>
            <span>Compra sin riesgo</span>
          </div>
        </div>

        <div className="trust-item">
          <span className="ic">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>

          <div>
            <strong>Soporte +4.8★</strong>
            <span>Atención cercana</span>
          </div>
        </div>
      </div>
    </div>
  )
}
