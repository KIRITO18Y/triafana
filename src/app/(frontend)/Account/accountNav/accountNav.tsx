'use client'

import './accountNav.css'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faArrowsToCircle,
  faCreditCard,
  faGear,
} from '@fortawesome/free-solid-svg-icons'

export const AcccountNav = () => {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/customers/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)

        console.error('Error logout:', data)

        throw new Error('No se pudo cerrar la sesión')
      }

      router.refresh()
      router.replace('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <aside>
      <Link href="/account" className={`account-nv ${pathname === '/account' ? 'active' : ''}`}>
        <FontAwesomeIcon icon={faArrowsToCircle} />
        Resumen
      </Link>

      <Link
        href="/account/buysPage"
        className={`account-nv ${pathname === '/account/buysPage' ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faCreditCard} />
        Mis compras
      </Link>

      <Link
        href="/account/favorites"
        className={`account-nv ${pathname === '/account/favorites' ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faHeart} />
        Favoritos
      </Link>

      <Link
        href="/account/dataPage"
        className={`account-nv ${pathname === '/account/dataPage' ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faUser} />
        Mis datos
      </Link>

      <Link
        href="/account/preferences"
        className={`account-nv ${pathname === '/account/preferences' ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faGear} />
        Preferencias
      </Link>

      <button className="account-btn" style={{ color: 'red' }} onClick={handleLogout}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} className="btn-icon" />
        Cerrar sesión
      </button>
    </aside>
  )
}
