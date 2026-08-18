import './styles.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import { Header } from '@/layout/Header/Header'
import { Footer } from '@/layout/Footer/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { CartProvider } from '@/context/CartContext'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'TRIAFANA Store',
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
          <ToastContainer
            toastClassName="trifana-toast"
            position="bottom-right"
            autoClose={2000}
            hideProgressBar
            limit={1}
            closeOnClick
            pauseOnHover={false}
          />
        </CartProvider>
      </body>
    </html>
  )
}
