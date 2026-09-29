import './promo.css'

type PromoProps = {
  eyebrow?: string | null
  title: string
  description?: string | null
  icon?: string | null
  buttonText?: string | null
  buttonLink?: string | null
  secondButtonText?: string | null
  secondButtonLink?: string | null
}

export const Promo = ({
  eyebrow,
  title,
  description,
  icon,
  buttonText,
  buttonLink,
  secondButtonText,
  secondButtonLink,
}: PromoProps) => {
  return (
    <section className="promo-section" style={{ paddingTop: 0 }}>
      <div className="promo-container">
        <div>
          <span className="eyebro-promo" style={{ color: '#cdeef2' }}>
            {eyebrow}
          </span>
          <h2 className="promo-title">{title}</h2>
          {description && <p className="promo-p">{description}</p>}
          <div className="promo-btn">
            {buttonText && (
              <a href={buttonLink || '#'} className="btn promo-primary">
                {buttonText}
              </a>
            )}
            {secondButtonText && (
              <a href={secondButtonLink || '#'} className="btn promo-ghost btn-a">
                {secondButtonText}
              </a>
            )}
          </div>
        </div>
        {icon && <div className="promo-icon">{icon}</div>}
      </div>
    </section>
  )
}
