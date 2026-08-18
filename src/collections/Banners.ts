import type { CollectionConfig } from 'payload'

export const Banners: CollectionConfig = {
  slug: 'banners',

  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'accent',
      type: 'text',
    },

    {
      name: 'tag',
      type: 'text',
    },

    {
      name: 'description',
      type: 'textarea',
    },

    {
      name: 'offerTitle',
      type: 'text',
      defaultValue: 'Hasta',
    },

    {
      name: 'offerValue',
      type: 'text',
    },
    {
      name: 'price',
      type: 'text',
    },

    {
      name: 'buttonStyle',
      type: 'select',

      options: [
        {
          label: 'Coral',
          value: 'btn-primary',
        },
        {
          label: 'Teal',
          value: 'btn-teal',
        },
        {
          label: 'Blanco',
          value: 'btn-ghost',
        },
      ],

      defaultValue: 'btn-primary',
    },

    {
      name: 'buttonText',
      type: 'text',
    },

    {
      name: 'buttonLink',
      type: 'text',
    },

    {
      name: 'secondButtonText',
      type: 'text',
    },

    {
      name: 'secondButtonLink',
      type: 'text',
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
