import React from 'react'
import './styles.css'
import { Header } from '@/layout/Header/Header'
import { Footer } from '@/layout/Footer/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { CartProvider } from '@/context/CartContext'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Trifana Stores',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ScrollToTop />

          <div className="container-header">
            <Header />
          </div>

          <main>{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
