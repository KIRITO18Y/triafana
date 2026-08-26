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
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },

    {
      name: 'email',
      type: 'text',
      required: true,
    },

    {
      name: 'phone',
      type: 'text',
    },
  ],
}
