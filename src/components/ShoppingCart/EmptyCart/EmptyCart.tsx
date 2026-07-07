import Link from 'next/link'
import './emptyCart.css'
const EmptyCart = () => {
  return (
    <div className="empty-state">
      <div className="ic">🛒</div>
      <h3>Tu carrito está vacío</h3>
      <p>Agrega productos para verlos aquí.</p>
      <Link href="/store" className="btn btn-primary">
        Ir a la tienda
      </Link>
    </div>
  )
}

export default EmptyCart
