import './CheckoutSteps.css'

type CheckoutStepsProps = {
    datosCompletos: boolean
    envioCompleto: boolean
    pagoCompleto: boolean
}

export default function CheckoutSteps({
    datosCompletos,
    envioCompleto,
    pagoCompleto,
}: CheckoutStepsProps) {
    return (
        <div className="steps">
            <div className={`step ${datosCompletos ? 'is-complete' : ''}`}>
                <span className="n">1</span>
                Datos
            </div>

            <div className={`step ${envioCompleto ? 'is-complete' : ''}`}>
                <span className="n">2</span>
                Envío
            </div>

            <div className={`step ${pagoCompleto ? 'is-complete' : ''}`}>
                <span className="n">3</span>
                Pago
            </div>
        </div>
    )
}