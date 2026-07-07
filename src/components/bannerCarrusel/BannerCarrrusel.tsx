'use client'
import './bannerCarrusel.css'
import { useEffect, useState } from 'react'

import { Slide } from './Slide'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function BannerCarrusel({ banners = [] }: { banners?: any[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (banners.length === 0) return

    const interval = setInterval(() => {
      setActive((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [banners])

  const next = () => {
    setActive((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setActive((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  return (
    <section className="fullbleed">
      <div className="hero-carousel">
        <div
          className="hero-slides"
          style={{
            transform: `translateX(-${active * 100}%)`,
          }}
        >
          {banners.map((banner) => (
            <Slide key={banner.id} data={banner} />
          ))}
        </div>

        <button className="hero-arrow prev" onClick={prev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button className="hero-arrow next" onClick={next}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        <div className="hero-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={active === index ? 'is-active' : ''}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
