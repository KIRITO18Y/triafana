'use client'
import '../Header/header.css'
import Link from 'next/link'
import Logo from '../Logo/Logo'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faXmark,
  faCartShopping,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useCart } from '@/context/CartContext'
import AvatarLink from '../AvatarLink/AvatarLink'

export const Header = () => {
  const [scroll, setScroll] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const pathname = usePathname()
  const { cart } = useCart()

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <div className="header-container">
      <div className={`header ${scroll ? 'header-scroll' : ''}`}>
        <div className="nav-shell">
          <Logo className="logo" width={40} height={40} />
          <Link href="/" className="title-link">
            <b>TRIAFANA</b>
          </Link>

          <nav className="nav">
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
              Inicio
            </Link>

            <Link
              href="/tecnology"
              className={`nav-link ${pathname === '/tecnology' ? 'active' : ''}`}
            >
              Tecnología
            </Link>

            <Link
              href="/cosmeticsShop"
              className={`nav-link ${pathname === '/cosmeticsShop' ? 'active' : ''}`}
            >
              Cosmetiquería
            </Link>

            <Link href="/clothes" className={`nav-link ${pathname === '/clothes' ? 'active' : ''}`}>
              Ropa
            </Link>

            <Link
              href="/services"
              className={`nav-link ${pathname === '/services' ? 'active' : ''}`}
            >
              Servicios
            </Link>
          </nav>

          <form className="nav-search">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />

            <input type="text" placeholder="Buscar productos, marcas" />
          </form>

          <div className="nav-actions">
            <Link href="/account/favoritesPage" className="icon-btn" aria-label="Favoritos">
              <FontAwesomeIcon icon={faHeart} />
            </Link>

            <Link href="/cart" className="icon-btn" aria-label="Carrito">
              <FontAwesomeIcon icon={faCartShopping} />

              {totalItems > 0 && (
                <div className="count">
                  <span className="countTotal">{totalItems}</span>
                </div>
              )}
            </Link>

            <AvatarLink />
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}

        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <button
              type="button"
              className="mobile-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <Link href="/" className="mobile-logo">
              <b>TRIAFANA</b>
            </Link>

            <nav className="mobile-nav">
              <Link href="/" className={pathname === '/' ? 'active' : ''}>
                Inicio
              </Link>

              <Link href="/tecnology" className={pathname === '/tecnology' ? 'active' : ''}>
                Tecnología
              </Link>

              <Link href="/cosmeticsShop" className={pathname === '/cosmeticsShop' ? 'active' : ''}>
                Cosmetiquería
              </Link>

              <Link href="/clothes" className={pathname === '/clothes' ? 'active' : ''}>
                Ropa
              </Link>

              <Link href="/services" className={pathname === '/services' ? 'active' : ''}>
                Servicios
              </Link>
            </nav>
            <Link href="/account" className="mobile-account">
              Mi cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
