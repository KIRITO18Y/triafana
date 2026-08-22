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

    // PRIMER BOTÓN
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
          value: 'btn-glass',
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

    // SEGUNDO BOTÓN
    {
      name: 'secondButtonText',
      type: 'text',
    },

    {
      name: 'secondButtonLink',
      type: 'text',
    },

    {
      name: 'secondButtonStyle',
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
          label: 'Cristal',
          value: 'btn-glass-strong',
        },
      ],
      defaultValue: 'btn-glass-strong',
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
