export type CouponDef = {
  id: number | string
  code: string
  discountType: 'percent' | 'fixed'
  value: number
  minPurchase: number
  maxUses?: number | null
  usedCount: number
  active: boolean
  expiresAt?: string | null
}

export const formatCOP = (n: number) => `$${Math.round(n).toLocaleString('es-CO')}`

export function calcDiscount(subtotal: number, coupon: Pick<CouponDef, 'discountType' | 'value'>) {
  if (subtotal <= 0) return 0
  const raw = coupon.discountType === 'percent' ? (subtotal * coupon.value) / 100 : coupon.value
  return Math.max(0, Math.min(Math.round(raw), Math.round(subtotal)))
}

export function minPurchaseWarning(subtotal: number, coupon: CouponDef): string | null {
  if ((coupon.minPurchase || 0) > subtotal) {
    return `Este cupón requiere compra mínima de ${formatCOP(coupon.minPurchase)}`
  }
  return null
}

export async function fetchCoupon(
  code: string,
): Promise<{ ok: true; coupon: CouponDef } | { ok: false; error: string }> {
  const clean = code.trim().toUpperCase()
  if (!clean) return { ok: false, error: 'Escribe un código de cupón.' }

  try {
    const res = await fetch(
      `/api/coupons?where[code][equals]=${encodeURIComponent(clean)}&limit=1`,
      { cache: 'no-store' },
    )
    if (!res.ok) return { ok: false, error: 'No se pudo validar el cupón.' }
    const data = await res.json()
    const coupon = data.docs?.[0] as CouponDef | undefined
    if (!coupon) return { ok: false, error: 'Cupón inválido.' }
    if (!coupon.active) return { ok: false, error: 'Este cupón ya no está activo.' }
    if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < Date.now()) {
      return { ok: false, error: 'Este cupón venció.' }
    }
    if (coupon.maxUses != null && (coupon.usedCount || 0) >= coupon.maxUses) {
      return { ok: false, error: 'Este cupón agotó sus usos.' }
    }
    return { ok: true, coupon }
  } catch {
    return { ok: false, error: 'No se pudo validar el cupón.' }
  }
}
