'use client'
import './loginForm.css'
import { useState } from 'react'

export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true)

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
  }

  const register = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/customers/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (res.ok) {
      alert('Cuenta creada correctamente 🎉')

      setForm({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
      })

      setIsLogin(true)
    } else {
      alert(data.errors?.[0]?.message || 'Ocurrió un error')
    }
  }

  return (
    <section>
      <div className="auth-form">
        <div className="auth-tabs">
          <button
            type="button"
            className={isLogin ? 'is-active' : ''}
            onClick={() => setIsLogin(true)}
          >
            Iniciar sesión
          </button>

          <button
            type="button"
            className={!isLogin ? 'is-active' : ''}
            onClick={() => setIsLogin(false)}
          >
            Crear cuenta
          </button>
        </div>

        {isLogin ? (
          <form>
            <div className="field">
              <label>Correo electrónico</label>
              <input type="email" placeholder="Correo" />
            </div>

            <div className="field">
              <label>Contraseña</label>
              <input type="password" placeholder="Contraseña" />
            </div>

            <div className="filter-check">
              <label className="filter-opt">
                <input type="checkbox" />
                Recordarme
              </label>

              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Iniciar sesión
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
                required
              />
            </div>

            <label className="filter-opt">
              <input type="checkbox" required />
              Acepto los términos y condiciones
            </label>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Crear cuenta
            </button>
          </form>
        )}

        <p className="p-conexion">🔒 Conexión segura cifrada</p>
      </div>
    </section>
  )
}
