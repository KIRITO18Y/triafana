import React from 'react'

export default function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="tf-l" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9fe0e0" />
          <stop offset="1" stopColor="#48A9B3" />
        </linearGradient>

        <linearGradient id="tf-r" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bdf3ff" />
          <stop offset="1" stopColor="#80E5FF" />
        </linearGradient>
      </defs>

      <polygon points="50,8 50,58 14,74" fill="url(#tf-l)" />
      <polygon points="50,8 86,74 50,58" fill="url(#tf-r)" />
      <polygon points="14,80 50,64 86,80 50,94" fill="#8fd6da" />
      <polygon points="50,64 86,80 50,72" fill="#bdf3ff" opacity="0.7" />
    </svg>
  )
}
