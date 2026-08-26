import './bannerCarrusel.css'

type Props = {
  data: any
}

export const Slide = ({ data }: Props) => {
  return (
    <div
      className="hero-slide"
      style={{
        backgroundImage: `url(${data.image.url})`,
      }}
    >
      <div className="slide-inner">
        <div className="slide-copy">
          <span className="slide-tag">{data.tag}</span>
          <h1>
            {data.title} <span className="accent">{data.accent}</span>
          </h1>

          <p>{data.description}</p>
          <div className="price-flag">
            <span>{data.offerTitle}</span>
            <b>{data.offerValue}</b>
          </div>
          <div className="slide-actions">
            <a href={data.buttonLink || '#'} className={`btn ${data.buttonStyle || 'btn-teal'}`}>
              {data.buttonText}
            </a>
            {data.secondButtonText && (
              <a
                href={data.secondButtonLink || '#'}
                className={`btn ${data.secondButtonStyle || 'btn-glass-strong'}`}
              >
                {data.secondButtonText}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
