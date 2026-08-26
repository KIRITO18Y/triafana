import type { CollectionConfig } from 'payload'

export const Subcategories: CollectionConfig = {
  slug: 'subcategories',

  admin: {
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre',
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },

    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categoría',
      options: [
        {
          label: 'Tecnología',
          value: 'tecnologia',
        },
        {
          label: 'Cosmetiquería',
          value: 'cosmetiqueria',
        },
        {
          label: 'Ropa',
          value: 'ropa',
        },
      ],
    },
  ],
}
