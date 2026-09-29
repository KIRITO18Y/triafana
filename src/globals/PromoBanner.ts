import type { GlobalConfig } from 'payload'

export const PromoBanner: GlobalConfig = {
  slug: 'promo-banner',

  label: 'Banner de Promociones',

  admin: {
    description: 'Sección de promociones que aparece en la página de inicio.',
  },

  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar sección',
    },

    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Promociones',
    },

    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Hasta 30% en tecnología seleccionada',
    },

    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Renueva tus equipos esta temporada. Ofertas por tiempo limitado en computadores, audio y accesorios.',
    },

    {
      name: 'icon',
      type: 'text',
      defaultValue: '🔥',
      admin: {
        description: 'Emoji que se muestra junto al texto.',
      },
    },

    // PRIMER BOTÓN
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Ver ofertas',
    },

    {
      name: 'buttonLink',
      type: 'text',
      defaultValue: '/tecnology',
    },

    // SEGUNDO BOTÓN
    {
      name: 'secondButtonText',
      type: 'text',
      defaultValue: 'Todas las promos',
    },

    {
      name: 'secondButtonLink',
      type: 'text',
      defaultValue: '/store',
    },
  ],
}
