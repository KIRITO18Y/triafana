import type { CollectionConfig } from 'payload'

export const Coupons: CollectionConfig = {
  slug: 'coupons',

  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'discountType', 'value', 'active', 'usedCount'],
  },

  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      label: 'Código (ej: TRIAFANA10)',
    },

    {
      name: 'discountType',
      type: 'select',
      required: true,
      defaultValue: 'percent',
      label: 'Tipo de descuento',
      options: [
        { label: 'Porcentaje %', value: 'percent' },
        { label: 'Valor fijo $', value: 'fixed' },
      ],
    },

    {
      name: 'value',
      type: 'number',
      required: true,
      min: 0,
      label: 'Valor (%, o pesos si es fijo)',
    },

    {
      name: 'minPurchase',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      label: 'Compra mínima ($)',
    },

    {
      name: 'maxUses',
      type: 'number',
      required: false,
      min: 1,
      label: 'Usos máximos (vacío = ilimitado)',
    },

    {
      name: 'usedCount',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      label: 'Veces usado',
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'active',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      label: 'Activo',
    },

    {
      name: 'expiresAt',
      type: 'date',
      required: false,
      label: 'Vence el (vacío = no vence)',
    },
  ],

  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.code) {
          data.code = String(data.code).trim().toUpperCase()
        }
        return data
      },
    ],
  },

  access: {
    read: () => true,
    create: ({ req }) => {
      return Boolean(req.user && req.user.collection !== 'customers')
    },
    update: ({ req }) => {
      return Boolean(req.user && req.user.collection !== 'customers')
    },
    delete: ({ req }) => {
      return Boolean(req.user && req.user.collection !== 'customers')
    },
  },
}
