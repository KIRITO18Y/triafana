'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function SortSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const sort = searchParams.get('sort') || ''

  return (
    <select
      value={sort}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams)

        if (e.target.value) {
          params.set('sort', e.target.value)
        } else {
          params.delete('sort')
        }

        router.push(`${pathname}?${params.toString()}`)
      }}
    >
      <option value="rel">Relevancia</option>
      <option value="asc">Precio mayor</option>
      <option value="desc">Precio menor </option>
    </select>
  )
}
