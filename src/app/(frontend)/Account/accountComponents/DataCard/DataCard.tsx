import './dataCard.css'
import { DataCardForm } from './DataCardForm'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import config from '@payload-config'
export const DataCard = async () => {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    return (
      <div className="dataCard">
        <h3 className="data-title">Mis datos</h3>
        <p>No has iniciado sesión.</p>
      </div>
    )
  }

  const customer = user as typeof user & {
    firstName?: string
    lastName?: string
    phone?: string
    avatar?: { url?: string } | string | null
  }


  return (
    <div className="dataCard">
      <h3 className="data-title">Mis datos</h3>
      <DataCardForm
        customer={{
          id: customer.id,
          firstName: customer.firstName || '',
          lastName: customer.lastName || '',
          email: customer.email || '',
          phone: customer.phone || '',
        }}
      />
    </div>
  )
}