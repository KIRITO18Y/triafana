'use client'

import '../Header/header.css'
import Link from 'next/link'
import Logo from '../Logo/Logo'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useCart } from '@/context/CartContext'
import AvatarLink from '../AvatarLink/AvatarLink'

export const Header = () => {
  const [scroll, setScroll] = useState(false)

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

  return (
    <div className="container-header">
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
              Tecnologia
            </Link>

            <Link
              href="/cosmeticsShop"
              className={`nav-link ${pathname === '/cosmeticsShop' ? 'active' : ''}`}
            >
              Cosmetiqueria
            </Link>

            <Link href="/clothes" className={`nav-link ${pathname === '/clothes' ? 'active' : ''}`}>
              Ropa
            </Link>

            <Link
              href="/Services"
              className={`nav-link ${pathname === '/Services' ? 'active' : ''}`}
            >
              Servicios
            </Link>
          </nav>

          <form className="nav-search">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
            <input type="text" placeholder="Buscar productos, marcas" />
          </form>

          <div className="nav-actions">
            <Link href={''} className="icon-btn">
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
        </div>
      </div>
    </div>
  )
}
