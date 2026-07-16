'use client'
import { useState } from 'react'
import './loginForm.css'
export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true)

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

            <button className="btn btn-primary btn-block btn-lg">Iniciar sesión</button>
          </form>
        ) : (
          <form>
            <div className="form-grid">
              <div className="field">
                <label>Nombre</label>
                <input type="text" placeholder="Juan" />
              </div>

              <div className="field">
                <label>Apellido</label>
                <input type="text" placeholder="Pérez" />
              </div>
            </div>

            <div className="field">
              <label>Correo electrónico</label>
              <input type="email" placeholder="Correo" />
            </div>

            <div className="field">
              <label>Contraseña</label>
              <input type="password" placeholder="Mínimo 8 caracteres" />
            </div>

            <label className="filter-opt">
              <input type="checkbox" />
              Acepto los términos y condiciones
            </label>

            <button className="btn btn-primary btn-block btn-lg">Crear cuenta</button>
          </form>
        )}

        <p className="p-conexion">🔒 Conexión segura cifrada</p>
      </div>
    </section>
  )
}
