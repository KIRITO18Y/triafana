'use client'
import './avatarUpload.css'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
    userId: string | number
    avatarUrl?: string
    initials: string
    fullName: string
}

export const AvatarUpload = ({ userId, avatarUrl, initials, fullName }: Props) => {
    const [preview, setPreview] = useState(avatarUrl)
    const [loading, setLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setLoading(true)
        try {
            const mediaForm = new FormData()
            mediaForm.append('file', file)
            const mediaRes = await fetch('/api/media', {
                method: 'POST',
                body: mediaForm,
                credentials: 'include',
            })
            const media = await mediaRes.json()
            await fetch(`/api/users/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ avatar: media.doc.id }),
            })

            setPreview(media.doc.url)
            router.refresh()
        } catch (err) {
            console.error('Error al subir la foto', err)
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = async () => {
        setLoading(true)
        try {
            await fetch(`/api/users/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ avatar: null }),
            })
            setPreview(undefined)
            router.refresh()
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="avatarSection">
            <div className="avatarWrapper">
                {preview ? (
                    <img src={preview} alt={fullName} className="avatarImg" />
                ) : (
                    <div className="avatarFallback">{initials}</div>
                )}
                <button
                    type="button"
                    className="avatarCameraBtn"
                    onClick={() => inputRef.current?.click()}
                    aria-label="Cambiar foto"
                    disabled={loading}
                >
                    📷
                </button>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                    hidden
                />
            </div>

            <div className="avatarInfo">
                <p className="avatarName">{fullName}</p>
                <p className="avatarHint">JPG o PNG, máximo 5 MB</p>
                <div className="avatarActions">
                    <button type="button" onClick={() => inputRef.current?.click()} disabled={loading}>
                        {loading ? 'Subiendo…' : 'Cambiar foto'}
                    </button>
                    {preview && (
                        <button type="button" className="avatarRemoveBtn" onClick={handleRemove} disabled={loading}>
                            Eliminar
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}