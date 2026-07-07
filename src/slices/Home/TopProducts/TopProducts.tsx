;<main className="container">
  <section className="page-head">
    <nav className="breadcrumb">
      <a href="/">Inicio</a> /<a href="/tienda">Tienda</a> /<span>Producto</span>
    </nav>
  </section>

  <section className="pdp">
    <div className="pdp-gallery">
      <div className="main-img">📦</div>

      <div className="pdp-thumbs"></div>
    </div>

    <div className="pdp-info">
      <span className="cat">Categoría</span>

      <h1>Producto</h1>

      <span className="rating"></span>

      <div className="pdp-price">
        <span className="now">$0</span>

        <span className="old"></span>

        <span className="badge badge-coral" style={{ display: 'none' }}></span>
      </div>

      <p className="pdp-desc">
        Producto de alta calidad seleccionado por TRIAFANA. Garantía oficial, envío rápido y soporte
        postventa.
      </p>

      <div className="opt-block">
        <label>Color</label>

        <div className="swatches">
          <span className="swatch is-active"></span>

          <span className="swatch"></span>

          <span className="swatch"></span>

          <span className="swatch"></span>
        </div>
      </div>

      <div className="opt-block">
        <label>Cantidad</label>

        <div className="qty">
          <button>−</button>

          <input type="text" value="1" readOnly />

          <button>+</button>
        </div>
      </div>

      <div className="pdp-actions">
        <button className="btn btn-primary btn-lg">Agregar al carrito</button>

        <a className="btn btn-teal btn-lg" href="/checkout">
          Comprar ahora
        </a>
      </div>

      <div className="pdp-meta">
        <div className="row">🚚 Envío gratis en compras superiores a $200.000</div>

        <div className="row">🔒 Pago 100% seguro · Garantía oficial</div>

        <div className="row">🔄 Devolución gratuita dentro de 30 días</div>
      </div>
    </div>
  </section>

  <section className="section">
    <div className="data-card">
      <h3 style={{ marginBottom: '14px' }}>Descripción</h3>

      <p style={{ color: 'var(--muted)' }}>
        En TRIAFANA seleccionamos cada producto pensando en calidad, durabilidad y la mejor
        experiencia.
      </p>

      <div className="grid cols-3" style={{ marginTop: '22px' }}>
        <div>
          <strong>Garantía</strong>

          <p>12 meses oficiales</p>
        </div>

        <div>
          <strong>Envío</strong>

          <p>24–48h a nivel nacional</p>
        </div>

        <div>
          <strong>Pagos</strong>

          <p>Tarjeta, PSE, contraentrega</p>
        </div>
      </div>
    </div>
  </section>

  <section className="section">
    <div className="section-head">
      <span className="eyebrow">También te puede gustar</span>

      <h2>Productos relacionados</h2>
    </div>

    <div className="product-grid"></div>
  </section>
</main>
