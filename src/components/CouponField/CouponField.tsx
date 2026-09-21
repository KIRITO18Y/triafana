'use client'
import './couponField.css'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { fetchCoupon, minPurchaseWarning } from '@/lib/coupons'
import { toast } from 'react-toastify'

export const CouponField = ({ subtotal }: { subtotal: number }) => {
  const { coupon, applyCoupon, removeCoupon } = useCart()
  const [code, setCode] = useState('')
  const [checking, setChecking] = useState(false)
  const [localError, setLocalError] = useState('')

  const handleApply = async () => {
    setLocalError('')
    setChecking(true)
    const result = await fetchCoupon(code)
    setChecking(false)

    if (!result.ok) {
      setLocalError(result.error)
      return
    }

    const minWarning = minPurchaseWarning(subtotal, result.coupon)
    if (minWarning) {
      setLocalError(minWarning)
      return
    }

    applyCoupon(result.coupon)
    setCode('')
    toast.success(`Cupón ${result.coupon.code} aplicado`, { toastId: 'coupon-applied' })
  }

  if (coupon) {
    const minWarning = minPurchaseWarning(subtotal, coupon)
    return (
      <div className="coupon-applied">
        <span className="coupon-tag">
          🎟️ {coupon.code}
          <button
            type="button"
            className="coupon-remove"
            onClick={() => {
              removeCoupon()
              toast.info('Cupón retirado', { toastId: 'coupon-removed' })
            }}
            aria-label="Quitar cupón"
          >
            ×
          </button>
        </span>
        {minWarning && <p className="coupon-hint">{minWarning} (sin descuento por ahora)</p>}
      </div>
    )
  }

  return (
    <div className="coupon-box">
      <div className="coupon-row">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleApply()
            }
          }}
          placeholder="Código de cupón"
          aria-label="Código de cupón"
          className="coupon-input"
          disabled={checking}
        />
        <button
          type="button"
          className="coupon-apply"
          onClick={handleApply}
          disabled={checking || !code.trim()}
        >
          {checking ? '…' : 'Aplicar'}
        </button>
      </div>
      {localError && <p className="coupon-error">{localError}</p>}
    </div>
  )
}
