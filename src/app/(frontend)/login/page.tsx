'use client'
import './login.css'
import { useEffect, useState } from 'react'
import AuthAside from '@/layout/auth/AuthAside/AuthAside'
import { LoginForm } from '@/layout/auth/login/LoginForm'
export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [redirectTo, setRedirectTo] = useState('/account')

  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get('next')
    if (next && next.startsWith('/') && !next.startsWith('//')) {
      setRedirectTo(next)
    }
  }, [])

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
        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  )
}
