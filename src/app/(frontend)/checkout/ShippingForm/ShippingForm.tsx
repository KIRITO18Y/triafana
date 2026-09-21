import '../form.css'

type CheckoutForm = {
    direccion: string
    ciudad: string
    departamento: string
    codigoPostal: string
    indicaciones: string
}

type ShippingFormProps = {
    form: CheckoutForm
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
}

export default function ShippingForm({
    form,
    onChange,
}: ShippingFormProps) {
    return (
        <div className="form-card">
            <h3>
                <span className="checkoutBadge badge-cyan">2</span>
                Dirección de envío
            </h3>

            <div className="form-grid">
                <div className="field full">
                    <label>Dirección</label>

                    <input
                        type="text"
                        name="direccion"
                        value={form.direccion}
                        onChange={onChange}
                        placeholder="Cra 00 # 00-00"
                        required
                    />
                </div>

                <div className="field">
                    <label>Ciudad</label>

                    <input
                        type="text"
                        name="ciudad"
                        value={form.ciudad}
                        onChange={onChange}
                        placeholder="Bogotá"
                        required
                    />
                </div>

                <div className="field">
                    <label>Departamento</label>

                    <select
                        name="departamento"
                        value={form.departamento}
                        onChange={onChange}
                        required
                    >
                        <option value="">Seleccione...</option>
                        <option value="Cundinamarca">Cundinamarca</option>
                        <option value="Antioquia">Antioquia</option>
                        <option value="Valle del Cauca">
                            Valle del Cauca
                        </option>
                        <option value="Atlántico">Atlántico</option>
                        <option value="Santander">Santander</option>
                    </select>
                </div>

                <div className="field">
                    <label>Código postal</label>

                    <input
                        type="text"
                        name="codigoPostal"
                        value={form.codigoPostal}
                        onChange={onChange}
                        placeholder="110111"
                    />
                </div>

                <div className="field">
                    <label>Indicaciones (opcional)</label>
                    <input
                        type="text"
                        name="indicaciones"
                        value={form.indicaciones}
                        onChange={onChange}
                        placeholder="Apto, torre…"
                    />
                </div>
            </div>
        </div>
    )
}