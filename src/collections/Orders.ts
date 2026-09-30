import type { CollectionConfig } from 'payload'
import { orderConfirmationEmail } from '../utilities/emailTemplates'

export const Orders: CollectionConfig = {
  slug: 'orders',

  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'customer', 'total', 'paymentStatus', 'status', 'createdAt'],
  },

  access: {
    create: () => true,
    read: ({ req }) => {
      if (!req.user) {
        return false
      }

      return {
        customer: {
          equals: req.user.id,
        },
      }
    },
    // Payment status only changes through our own server code (the Wompi
    // checkout session route and the Wompi webhook), both of which use the
    // local API and bypass access control. Nobody should be able to PATCH
    // their own order to APPROVED through the REST/GraphQL API.
    update: () => false,
    delete: () => false,
  },

  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
      label: 'Cliente',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Productos',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Precio unitario',
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'shipping',
      type: 'group',
      label: 'Envío',
      fields: [
        { name: 'address', type: 'text', required: true, label: 'Dirección' },
        { name: 'city', type: 'text', required: true, label: 'Ciudad' },
        { name: 'department', type: 'text', required: true, label: 'Departamento' },
        { name: 'postalCode', type: 'text', label: 'Código postal' },
        { name: 'notes', type: 'text', label: 'Indicaciones' },
        { name: 'phone', type: 'text', required: true, label: 'Teléfono' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pendiente', value: 'pending' },
        { label: 'Confirmado', value: 'confirmed' },
        { label: 'Enviado', value: 'shipped' },
        { label: 'Entregado', value: 'delivered' },
        { label: 'Cancelado', value: 'cancelled' },
      ],
    },
    {
      name: 'reference',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Referencia de pago',
      admin: {
        description: 'Referencia única enviada a Wompi para esta orden.',
        readOnly: true,
      },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'PENDING',
      label: 'Estado del pago',
      options: [
        { label: 'Pendiente', value: 'PENDING' },
        { label: 'Aprobado', value: 'APPROVED' },
        { label: 'Rechazado', value: 'DECLINED' },
        { label: 'Anulado', value: 'VOIDED' },
        { label: 'Error', value: 'ERROR' },
      ],
    },
    {
      name: 'wompiTransactionId',
      type: 'text',
      label: 'ID de transacción Wompi',
      admin: { readOnly: true },
    },
    {
      name: 'paymentMethodType',
      type: 'text',
      label: 'Método de pago',
      admin: { readOnly: true },
    },
  ],

  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        const justApproved =
          doc.paymentStatus === 'APPROVED' &&
          (operation === 'create' ? true : previousDoc?.paymentStatus !== 'APPROVED')

        if (!justApproved) {
          return
        }

        const customer = await req.payload.findByID({
          collection: 'customers',
          id: typeof doc.customer === 'object' ? doc.customer.id : doc.customer,
        })

        const items = await Promise.all(
          doc.items.map(async (item: { product: number | string | { id: number | string; name: string }; quantity: number; price: number }) => {
            const product =
              typeof item.product === 'object'
                ? item.product
                : await req.payload.findByID({ collection: 'products', id: item.product })

            return {
              name: product.name,
              quantity: item.quantity,
              price: item.price,
            }
          }),
        )

        const { subject, html } = orderConfirmationEmail(
          { firstName: customer.firstName },
          { id: doc.id, total: doc.total, items },
        )

        await req.payload.sendEmail({
          to: customer.email,
          subject,
          html,
        })
      },
    ],
  },
}
