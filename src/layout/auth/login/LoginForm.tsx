'use client'

import './loginForm.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const LoginForm = () => {
  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

    setError('')
  }

  const register = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          password: form.password,
        }),
      })

      const data = await res.json()

      console.log('RESPUESTA REGISTRO:', data)

      if (!res.ok) {
        throw new Error(data?.errors?.[0]?.message || data?.message || 'No se pudo crear la cuenta')
      }
      router.push('/account')
      router.refresh()
    } catch (error) {
      console.error('ERROR REGISTRO:', error)

      alert(error instanceof Error ? error.message : 'Ocurrió un error al crear la cuenta')
    }
  }

  const login = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/customers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data?.errors?.[0]?.message || data?.message || 'Correo o contraseña incorrectos',
        )
      }
      setForm({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
      })

      router.push('/account')
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ocurrió un error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className="auth-form">
        <div className="auth-tabs">
          <button
            type="button"
            className={isLogin ? 'is-active' : ''}
            onClick={() => {
              setIsLogin(true)
              setError('')
            }}
          >
            Iniciar sesión
          </button>

          <button
            type="button"
            className={!isLogin ? 'is-active' : ''}
            onClick={() => {
              setIsLogin(false)
              setError('')
            }}
          >
            Crear cuenta
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {isLogin ? (
          <form onSubmit={login}>
            <div className="field">
              <label>Correo electrónico</label>

              <input
                name="email"
                type="email"
                placeholder="Correo"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Contraseña</label>

              <input
                name="password"
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="filter-check">
              <label className="filter-opt">
                <input type="checkbox" />
                Recordarme
              </label>

              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        ) : (
          <form onSubmit={register}>
            <div className="form-grid">
              <div className="field">
                <label>Nombre</label>

                <input
                  name="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Apellido</label>

                <input
                  name="apellido"
                  type="text"
                  placeholder="Apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Correo electrónico</label>
              <input
                name="email"
                type="email"
                placeholder="Correo"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Contraseña</label>

              <input
                name="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            <label className="filter-opt">
              <input type="checkbox" required />
              Acepto los términos y la política de privacidad
            </label>

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
        )}

        <p className="p-conexion">🔒 Conexión segura cifrada</p>
      </div>
    </section>
  )
}
