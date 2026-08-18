import './buysCard.css'
export const BuysCard = () => {
  return (
    <div className="buysCard">
      <h3 className="buys-title">Mis Compras</h3>
      <div className="order-row">
        <div>
          <div className="oid">#TF-2026-0481</div>
          <div className="meta">22 jun 2026 · 2 productos</div>
        </div>
        <span className="status ok">Entregado</span>
        <span className="price">300000</span>
      </div>

      <div className="order-row">
        <div>
          <div className="oid">#TF-2026-0481</div>
          <div className="meta">22 jun 2026 · 2 productos</div>
        </div>
        <span className="status pend">En camino</span>
        <span className="price">300000</span>
      </div>

      <div className="order-row">
        <div>
          <div className="oid">#TF-2026-0481</div>
          <div className="meta">22 jun 2026 · 2 productos</div>
        </div>
        <span className="status ok">Entregado</span>
        <span className="price">300000</span>
      </div>
    </div>
  )
}
