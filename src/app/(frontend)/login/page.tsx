'use client'
import './login.css'
import { useState } from 'react'
import AuthAside from '@/layout/auth/AuthAside/AuthAside'
import { LoginForm } from '@/layout/auth/login/LoginForm'
export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="login-container">
      <section className="login-head">
        <nav className="nv-login">
          <a href="/" className="login-link">
            Inicio
          </a>
          / <span>Mi cuenta</span>
        </nav>
      </section>
      <div className="auth-wrap">
        <AuthAside isLogin={isLogin} />
        <LoginForm {...({ isLogin, setIsLogin } as any)} />
      </div>
    </div>
  )
}
