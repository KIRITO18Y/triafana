import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',

  admin: {
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre del producto',
    },

    {
      name: 'price',
      type: 'text',
      label: 'Precio',
      required: true,
    },

    {
      name: 'category',
      type: 'select',
      required: true,
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

    {
      name: 'subcategory',
      type: 'relationship',
      relationTo: 'subcategories',
      label: 'Subcategoría',
      required: true,
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagen del producto',
    },

    {
      name: 'discount',
      type: 'number',
      label: 'Descuento %',
    },

    {
      name: 'oldPrice',
      type: 'text',
      label: 'Precio anterior',
    },

    {
      name: 'featured',
      type: 'checkbox',
      label: 'Producto destacado',
    },
  ],
}
