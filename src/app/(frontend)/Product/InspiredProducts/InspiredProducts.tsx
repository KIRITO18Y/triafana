import './inspiredProducts.css'

export const InspiredProducts = () => {
  return (
    <>
      <div className="inspiredProducts">
        <div className="products-head">
          <div>
            <span className="eyebro-inpir">Para ti</span>
            <h1 className="inspireP-title">Inspirado en lo último que viste</h1>
          </div>
          <a className="link" href="/tecnology">
            Ver más →
          </a>
        </div>
        <div className="product-grid"></div>
      </div>
    </>
  )
}
