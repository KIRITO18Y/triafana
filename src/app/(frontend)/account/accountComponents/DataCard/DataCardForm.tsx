'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
type Props = {
  customer: {
    id: number | string
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

export function DataCardForm({ customer }: Props) {
  const [form, setForm] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await fetch(`/api/customers/${customer.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data?.errors?.[0]?.message || data?.message || 'No se pudieron guardar los cambios',
        )
      }

      toast.success('Datos actualizados correctamente', {
        toastId: 'data-updated',
      })
    } catch (error) {
      console.error('Error actualizando datos:', error)

      toast.error(
        error instanceof Error ? error.message : 'Ocurrió un error al actualizar los datos',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label>Nombre</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label>Apellidos</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="full-width-fields">
          <div className="field">
            <label>Correo</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="field">
            <label>Teléfono</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className='btn-container'>
        <button type="submit" className="btn-data btn-teal" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  )
}
