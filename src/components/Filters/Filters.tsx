import './filters.css'

export default function Filters() {
  return (
    <aside className="filters">
      <h3>Filtros</h3>
      <h4>Subcategoría</h4>
      <div className="sub-list">
        <label className="filter-opt">
          <input type="checkbox" />
          Computadores
        </label>
        <label className="filter-opt">
          <input type="checkbox" />
          Celulares
        </label>
        <label className="filter-opt">
          <input type="checkbox" />
          Audífonos
        </label>
      </div>

      <div className="filter-group">
        <h4>Precio</h4>
        <label className="filter-opt">
          <input type="checkbox" /> Menos de $100.000
        </label>
        <label className="filter-opt">
          <input type="checkbox" /> $100.000 – $500.000
        </label>

        <label className="filter-opt">
          <input type="checkbox" />
          $500.000 – $1.500.000
        </label>
        <label className="filter-opt">
          <input type="checkbox" />
          Más de $1.500.000
        </label>
      </div>

      <h4>Talla</h4>
      <div className="size-grid">
        <span className="size">XS</span>
        <span className="size">S</span>
        <span className="size">M</span>
        <span className="size">L</span>
      </div>

      <h4>Color</h4>
      <div className="swatches">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <button className="btn btn-teal btn-block">Aplicar filtros</button>
    </aside>
  )
}
