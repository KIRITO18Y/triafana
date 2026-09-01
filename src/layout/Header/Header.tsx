'use client'

import '../Header/header.css'
import Link from 'next/link'
import Logo from '../Logo/Logo'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
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
      if (window.scrollY > 50) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <div className="container-header">
      <div className={`header ${scroll ? 'header-scroll' : ''}`}>
        <div className="nav-shell">
          <Logo className="logo" width={40} height={40} />

          <Link href="/" className="title-link">
            <b>TRIAFANA</b>
          </Link>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
              Inicio
            </Link>

            <Link
              href="/tecnology"
              className={`nav-link ${pathname === '/tecnology' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Tecnologia
            </Link>

            <Link
              href="/cosmeticsShop"
              className={`nav-link ${pathname === '/cosmeticsShop' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Cosmetiqueria
            </Link>

            <Link href="/clothes" className={`nav-link ${pathname === '/clothes' ? 'active' : ''}`} onClick={closeMenu}>
              Ropa
            </Link>

            <Link
              href="/services"
              className={`nav-link ${pathname === '/services' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Servicios
            </Link>
          </nav>

          <form className="nav-search">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
            <input type="text" placeholder="Buscar productos, marcas" />
          </form>

          <div className="nav-actions">
            <Link href={'/account/favoritesPage'} className="icon-btn">
              <FontAwesomeIcon icon={faHeart} />
            </Link>

            <Link href={'/cart'} className="icon-btn">
              <FontAwesomeIcon icon={faCartShopping} />
              {totalItems > 0 && (
                <div className="count">
                  <span className="countToltal">{totalItems}</span>
                </div>
              )}
            </Link>

            <AvatarLink />
          </div>

          <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>
        </div>
      </div>
      {menuOpen && <div className="scrim show" onClick={closeMenu}></div>}
    </div>
  )
}
