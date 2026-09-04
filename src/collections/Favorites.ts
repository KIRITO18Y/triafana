import type { CollectionConfig } from 'payload'

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
}
