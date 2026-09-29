import type { CollectionConfig } from 'payload'
import { favoriteAddedEmail } from '../utilities/emailTemplates'

export const Favorites: CollectionConfig = {
  slug: 'favorites',

  admin: {
    useAsTitle: 'id',
  },

  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
      label: 'Usuario',
    },

    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      label: 'Producto',
    },
  ],

  indexes: [
    {
      fields: ['user', 'product'],
      unique: true,
    },
  ],

  access: {
    read: ({ req }) => {
      if (!req.user) {
        return false
      }

      return {
        user: {
          equals: req.user.id,
        },
      }
    },
  },

  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') {
          return
        }

        const customer =
          typeof doc.user === 'object'
            ? doc.user
            : await req.payload.findByID({ collection: 'customers', id: doc.user })

        const product =
          typeof doc.product === 'object'
            ? doc.product
            : await req.payload.findByID({ collection: 'products', id: doc.product })

        const { subject, html } = favoriteAddedEmail(
          { firstName: customer.firstName },
          { name: product.name },
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
