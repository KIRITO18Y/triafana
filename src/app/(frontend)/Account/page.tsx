import './accountPage.css'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AcccountNav } from './accountNav/accountNav'

const AccountPage = async () => {
  const payload = await getPayload({
    config,
  })

  const { user } = await payload.auth({
    headers: await headers(),
  })

  // Si no hay sesión, mandamos al login
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="account-container">
      <section className="page-head">
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link> / <span>Mi cuenta</span>
        </nav>
      </section>

      <div className="page-head">
        <h1 className="page-title">Hola, {'nombre' in user ? user.nombre : user.email} 👋</h1>
        <p className="lead">Gestiona tus compras, datos y preferencias.</p>
      </div>

      <div className="account-layout">
        <aside className="account-nav">
          <AcccountNav />
        </aside>
        <div className="stat-tiles">
          <div className="stat-tile">
            <strong>8</strong>
            <span>Pedidos totales</span>
          </div>

          <div className="stat-tile">
            <strong>3</strong>
            <span>En camino</span>
          </div>

          <div className="stat-tile">
            <strong>12</strong>
            <span>Favoritos</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
