'use client'

import '../Header/header.css'
import Link from 'next/link'
import Logo from '../Logo/Logo'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useCart } from '@/context/CartContext'

export const Header = () => {
  const [scroll, setScroll] = useState(false)

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
    <div className={`container-header ${scroll ? 'header-scroll' : ''}`}>
      <div className="nav-shell">
        <Logo className="logo" width={40} height={40} />

        <Link href="/" className="title-link">
          <h3 className="trifana-title">TRIFANA</h3>
        </Link>
        <nav className="main-nav">
          <Link href="/" className="nav-link">
            Inicio
          </Link>

          <Link href="/tecnology" className="nav-link">
            Tecnologia
          </Link>

          <Link href="/cosmeticsShop" className="nav-link">
            Cosmetiqueria
          </Link>

          <Link href="/clothes" className="nav-link">
            Ropa
          </Link>

          <Link href="/Services" className="nav-link">
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

          <Link href={'/login'} className="avatar">
            TF
          </Link>
        </div>
      </div>
    </div>
  )
}
