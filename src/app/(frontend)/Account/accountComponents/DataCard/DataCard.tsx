import { getPayload } from 'payload'
import { headers } from 'next/headers'
import config from '@payload-config'
import './dataCard.css'

export const DataCard = async () => {
  const payload = await getPayload({
    config,
  })

  const { user } = await payload.auth({
    headers: await headers(),
  })

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
  }

  return (
    <div className="dataCard">
      <h3 className="data-title">Mis datos</h3>

      <div className="form-grid">
        <div className="field">
          <label>Nombre</label>

          <input type="text" value={customer.firstName || ''} readOnly />
        </div>

        <div className="field">
          <label>Apellidos</label>

          <input type="text" value={customer.lastName || ''} readOnly />
        </div>

        <div className="full-width-fields">
          <div className="field">
            <label>Correo</label>

            <input type="email" value={customer.email || ''} readOnly />
          </div>

          <div className="field">
            <label>Teléfono</label>
            <input type="tel" value={customer.phone || ''} readOnly />
          </div>
        </div>
      </div>

      <button type="button" className="btn btn-teal">
        Guardar cambios
      </button>
    </div>
  )
}
