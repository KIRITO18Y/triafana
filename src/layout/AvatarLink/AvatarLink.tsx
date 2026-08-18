'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Customer = {
  id: number
  email: string
  nombre?: string
  apellido?: string
}

export default function AvatarLink() {
  const [user, setUser] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
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
    }

    getUser()
  }, [])

  if (loading) {
    return (
      <Link href="/login" className="avatar">
        TF
      </Link>
    )
  }

  if (user) {
    const initials = `${user.nombre?.[0] ?? ''}${user.apellido?.[0] ?? ''}`.toUpperCase() || 'TF'

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
