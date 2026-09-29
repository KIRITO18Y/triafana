type EmailContent = {
  subject: string
  html: string
}

const layout = (title: string, bodyHtml: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
    <h1 style="font-size: 20px; margin-bottom: 16px;">${title}</h1>
    ${bodyHtml}
    <p style="margin-top: 32px; font-size: 12px; color: #777;">Triafana · Bogotá, Colombia</p>
  </div>
`

export const welcomeEmail = (customer: { firstName: string }): EmailContent => ({
  subject: 'Bienvenido a Triafana',
  html: layout(
    `¡Hola, ${customer.firstName}!`,
    `<p>Gracias por registrarte en Triafana. Ya puedes explorar nuestro catálogo, guardar tus productos favoritos y realizar tus compras.</p>`,
  ),
})

export const favoriteAddedEmail = (
  customer: { firstName: string },
  product: { name: string },
): EmailContent => ({
  subject: `Agregaste "${product.name}" a tus favoritos`,
  html: layout(
    `Hola, ${customer.firstName}`,
    `<p>Guardamos <strong>${product.name}</strong> en tu lista de favoritos. Te avisaremos si cambia de precio o disponibilidad.</p>`,
  ),
})

export const orderConfirmationEmail = (
  customer: { firstName: string },
  order: { id: string | number; total: number; items: { name: string; quantity: number; price: number }[] },
): EmailContent => {
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 6px 8px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 6px 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 6px 8px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toLocaleString('es-CO')}</td>
        </tr>
      `,
    )
    .join('')

  return {
    subject: `Confirmación de pedido #${order.id}`,
    html: layout(
      `¡Gracias por tu compra, ${customer.firstName}!`,
      `
        <p>Recibimos tu pedido <strong>#${order.id}</strong>. Este es el resumen:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 6px 8px; border-bottom: 2px solid #333;">Producto</th>
              <th style="padding: 6px 8px; border-bottom: 2px solid #333;">Cant.</th>
              <th style="text-align: right; padding: 6px 8px; border-bottom: 2px solid #333;">Precio</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <p style="font-size: 16px;"><strong>Total: $${order.total.toLocaleString('es-CO')}</strong></p>
        <p>Te notificaremos cuando el estado de tu pedido cambie.</p>
      `,
    ),
  }
}
