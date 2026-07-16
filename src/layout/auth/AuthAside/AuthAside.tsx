import './authAside.css'

type Props = {
  isLogin: boolean
}

export default function AuthAside({ isLogin }: Props) {
  return (
    <div className="auth-aside">
      <span className="eyebrow">TRIAFANA Store</span>

      <h2>{isLogin ? 'Bienvenido de vuelta' : 'Únete a TRIAFANA Store'}</h2>

      <p>
        {isLogin
          ? 'Inicia sesión para ver tus compras, favoritos y preferencias.'
          : 'Crea una cuenta para comprar más rápido, guardar favoritos y hacer seguimiento de tus pedidos.'}
      </p>

      <ul className="benefits">
        <li>
          <span className="ck">{/* svg */}</span>
          Seguimiento de pedidos en tiempo real
        </li>

        <li>
          <span className="ck">{/* svg */}</span>
          Lista de favoritos guardada
        </li>

        <li>
          <span className="ck">{/* svg */}</span>
          Ofertas y promociones exclusivas
        </li>

        <li>
          <span className="ck">{/* svg */}</span>
          Pago más rápido
        </li>
      </ul>
    </div>
  )
}
