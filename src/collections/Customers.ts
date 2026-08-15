import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',

  auth: true,

  access: {
    create: () => true,
  },
  admin: {
    useAsTitle: 'email',
  },

  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'apellido',
      type: 'text',
      required: true,
    },
    {
      name: 'telefono',
      type: 'text',
    },
  ],
}
