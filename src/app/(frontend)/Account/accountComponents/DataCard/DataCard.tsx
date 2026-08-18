import './dataCard.css'
export const DataCard = () => {
  return (
    <div className="dataCard">
      <h3 className="data-title">Mis datos</h3>
      <div className="form-grid">
        <div className="field">
          <label>Nombre</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Apellidos</label>
          <input type="text" />
        </div>

        <div className="full-width-fields">
          <div className="field">
            <label>Correo</label>
            <input type="text" />
          </div>

          <div className="field">
            <label>Telefono</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <button className="btn btn-teal">Guardar cambios</button>
    </div>
  )
}
