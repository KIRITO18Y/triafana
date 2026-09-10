'use client'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

type Customer = {
  id: number
  email: string
  firstName?: string
  lastName?: string
  phone?: string
}

export default function AvatarLink() {
  const [user, setUser] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)

  const getUser = useCallback(async () => {
    try {
      const res = await fetch('/api/customers/me', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      })

      if (!res.ok) {
        setUser(null)
        return
      }
      const data = await res.json()
      setUser(data.user ?? null)
    } catch (error) {
      console.error('Error obteniendo usuario:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getUser()
    const handleAuthChange = () => {
      getUser()
    }
    window.addEventListener('auth-change', handleAuthChange)
    return () => {
      window.removeEventListener('auth-change', handleAuthChange)
    }
  }, [getUser])

  useEffect(() => {
    const handleFocus = () => {
      getUser()
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [getUser])

  if (loading) {
    return (
      <Link href="/login" className="avatar">
        TF
      </Link>
    )
  }

  if (user) {
    const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || 'FT'

    return (
      <Link href="/account" className="avatar">
        {initials}
      </Link>
    )
  }

  return (
    <Link href="/login" className="avatar">
      TF
    </Link>
  )
}
