import type { CollectionConfig } from 'payload'
import { orderConfirmationEmail } from '../utilities/emailTemplates'

export const Orders: CollectionConfig = {
  slug: 'orders',

  admin: {
    useAsTitle: 'id',
    defaultColumns: ['customer', 'total', 'status', 'createdAt'],
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
  ],

  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') {
          return
        }

        const customer = await req.payload.findByID({
          collection: 'customers',
          id: typeof doc.customer === 'object' ? doc.customer.id : doc.customer,
        })

        const items = await Promise.all(
          doc.items.map(
            async (item: {
              product: number | string | { id: number | string; name: string }
              quantity: number
              price: number
            }) => {
              const product =
                typeof item.product === 'object'
                  ? item.product
                  : await req.payload.findByID({ collection: 'products', id: item.product })

              return {
                name: product.name,
                quantity: item.quantity,
                price: item.price,
              }
            },
          ),
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
