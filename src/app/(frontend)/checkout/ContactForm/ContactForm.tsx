import '../form.css'

type CheckoutForm = {
    nombre: string
    apellido: string
    correo: string
    telefono: string
    direccion: string
    ciudad: string
    departamento: string
    codigoPostal: string
    indicaciones: string
    tarjeta: string
    nombreTarjeta: string
    vencimiento: string
    cvv: string
}

type ContactFormProps = {
    form: CheckoutForm
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
}

export default function ContactForm({
    form,
    onChange,
}: ContactFormProps) {
    return (
        <div className="form-card">
            <h3>
                <span className="checkoutBadge badge-cyan">1</span>
                Información de contacto
            </h3>

            <div className="form-grid">
                <div className="field">
                    <label>Nombre</label>

                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={onChange}
                        placeholder="Nombre"
                        required
                    />
                </div>

                <div className="field">
                    <label>Apellido</label>

                    <input
                        type="text"
                        name="apellido"
                        value={form.apellido}
                        onChange={onChange}
                        placeholder="Apellido"
                        required
                    />
                </div>

                <div className="field full">
                    <label>Correo electrónico</label>

                    <input
                        type="email"
                        name="correo"
                        value={form.correo}
                        onChange={onChange}
                        placeholder="Gmail"
                        required
                    />
                </div>

                <div className="field full">
                    <label>Teléfono</label>

                    <input
                        type="tel"
                        name="telefono"
                        value={form.telefono}
                        onChange={onChange}
                        placeholder="Teléfono"
                        required
                    />
                </div>
            </div>
        </div>
    )
}