'use client'
import './accountNav.css'
import Link from 'next/link'
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faArrowsToCircle,
  faCreditCard,
  faGear,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

export const AcccountNav = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/customers/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (!res.ok) {
        throw new Error('No se pudo cerrar la sesión')
      }
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <aside>
      <Link href="/account" className="nav-link">
        <FontAwesomeIcon icon={faArrowsToCircle} style={{ color: 'rgb(62, 63, 63)' }} />
        Resumen
      </Link>

      <Link href="/account/orders" className="nav-link">
        <FontAwesomeIcon icon={faCreditCard} style={{ color: 'rgb(62, 63, 63)' }} />
        Mis compras
      </Link>

      <Link href="/account/favorites" className="nav-link">
        <FontAwesomeIcon icon={faHeart} style={{ color: 'rgb(62, 63, 63)' }} />
        Favoritos
      </Link>

      <Link href="/account/profile" className="nav-link">
        <FontAwesomeIcon icon={faUser} style={{ color: 'rgb(62, 63, 63)' }} />
        Mis datos
      </Link>

      <Link href="/account/preferences" className="nav-link">
        <FontAwesomeIcon icon={faGear} style={{ color: 'rgb(62, 63, 63)' }} />
        Preferencias
      </Link>

      <button type="button" className="nav-link" style={{ color: 'red' }} onClick={handleLogout}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: 'rgb(62, 63, 63)' }} />
        Cerrar sesión
      </button>
    </aside>
  )
}
