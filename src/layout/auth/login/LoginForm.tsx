'use client'

import './loginForm.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
export const LoginForm = () => {
  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

    setError('')
  }
  const translateError = (message: string) => {
    const msg = message.toLowerCase()

    if (
      msg.includes('invalid credentials') ||
      msg.includes('invalid email or password') ||
      msg.includes('email or password')
    ) {
      return 'El correo electrónico o la contraseña son incorrectos.'
    }

    if (msg.includes('user not found')) {
      return 'No existe una cuenta con este correo electrónico.'
    }

    if (
      msg.includes('email already exists') ||
      msg.includes('email is already registered') ||
      msg.includes('unique')
    ) {
      return 'Este correo electrónico ya está registrado.'
    }

    if (msg.includes('password')) {
      return 'La contraseña no es válida. Debe tener al menos 8 caracteres.'
    }

    if (msg.includes('required')) {
      return 'Por favor, completa todos los campos obligatorios.'
    }

    if (msg.includes('email')) {
      return 'Por favor, introduce un correo electrónico válido.'
    }

    return message
  }
  const register = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      })

      const data = await res.json()

      console.log('RESPUESTA REGISTRO:', data)

      if (!res.ok) {
        const message =
          data?.errors?.[0]?.message ||
          data?.message ||
          'No se pudo crear la cuenta.'

        throw new Error(translateError(message))
      }

      window.dispatchEvent(new Event('auth-change'))

      router.push('/account')
      router.refresh()
    } catch (error) {
      console.error('ERROR REGISTRO:', error)

      setError(
        error instanceof Error
          ? error.message
          : 'Ocurrió un error al crear la cuenta.',
      )
    } finally {
      setLoading(false)
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

      console.log('RESPUESTA LOGIN:', data)

      if (!res.ok) {
        const message =
          data?.errors?.[0]?.message ||
          data?.message ||
          'Correo o contraseña incorrectos.'

        throw new Error(translateError(message))
      }

      toast.success('Sesión iniciada correctamente', {
        toastId: 'login-success-toast',
      })

      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
      })
      window.dispatchEvent(new Event('auth-change'))
      router.push('/account')
      router.refresh()
    } catch (error) {
      console.error('ERROR LOGIN:', error)

      setError(
        error instanceof Error
          ? error.message
          : 'Ocurrió un error al iniciar sesión.',
      )
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
                placeholder="Correo electrónico"
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

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        ) : (
          <form onSubmit={register}>
            <div className="form-grid">
              <div className="field">
                <label>Nombre</label>

                <input
                  name="firstName"
                  type="text"
                  placeholder="Nombre"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Apellido</label>

                <input
                  name="lastName"
                  type="text"
                  placeholder="Apellido"
                  value={form.lastName}
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
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Teléfono</label>

              <input
                name="phone"
                type="tel"
                placeholder="Teléfono"
                value={form.phone}
                onChange={handleChange}
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

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
        )}

        <p className="p-conexion">🔒 Conexión segura cifrada</p>
      </div>
    </section>
  )
}

