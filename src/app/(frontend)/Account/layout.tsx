import './accountPage.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AcccountNav } from './accountNav/accountNav'

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({
    config,
  })

  const { user } = await payload.auth({
    headers: await headers(),
  })

  if (!user) {
    redirect('/login')
  }

  const customer = user as typeof user & {
    nombre?: string
    apellido?: string
  }

  const nombre = customer.nombre || customer.email

  return (
    <div className="account-container">
      <section className="page-head">
        <nav className="account-breadcrumb">
          <a href="/" className="account-a">
            Inicio
          </a>
          / <span>Mi cuenta</span>
        </nav>
      </section>

      <div className="page-head">
        <h1 className="page-title">Hola, {nombre} 👋</h1>
        <p className="lead">Gestiona tus compras, datos y preferencias.</p>
      </div>

      <div className="account-layout">
        <aside className="account-nav">
          <AcccountNav />
        </aside>
        <main className="account-content">{children}</main>
      </div>
    </div>
  )
}
