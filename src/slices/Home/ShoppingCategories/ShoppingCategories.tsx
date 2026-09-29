import '../ShoppingCategories/shoppingCategories.css'
import Link from 'next/link'

export const ShoppingCategories = () => {
  return (
    <div className="shoppingCategories-container">
      <div className="section-head">
        <div>
          <span className="eyebrow-category">Categorías</span>
          <h2 className="shoppingCategories-title">Compra por categoría</h2>
        </div>
        <a className="link" href="/store">
          Ver todo →
        </a>
      </div>
      <div className="cat-strip">
        <Link className="cat-card c-tec" href={'/tecnology'}>
          <span className="blob"></span>
          <h3>Tecnología</h3>
          <p>Computadores, celulares, diademas, teclados e impresoras.</p>
          <span className="arrow">Explorar →</span>
        </Link>
      </div>
    </div>
  )
}
