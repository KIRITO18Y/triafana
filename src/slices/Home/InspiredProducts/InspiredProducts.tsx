import './inspiredProducts.css'

export const InspiredProducts = () => {
  return (
    <>
      <div className="inspiredProducts">
        <div className="section-head">
          <div>
            <span className="eyebrow">Para ti</span>
            <h2>Inspirado en lo último que viste</h2>
          </div>
          <a className="link" href="tienda.html">
            Ver más →
          </a>
        </div>
        <div className="product-grid" id="grid-inspirado"></div>
      </div>
    </>
  )
}
