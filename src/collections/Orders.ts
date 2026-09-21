import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',

  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customer', 'total', 'status', 'createdAt'],
  },

  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      label: 'Número de pedido',
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: false,
      label: 'Cliente (vacío = invitado)',
    },

    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Productos',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: false,
          label: 'Producto',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nombre',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
          label: 'Precio unitario',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          label: 'Cantidad',
        },
        {
          name: 'image',
          type: 'text',
          required: false,
          label: 'Imagen (URL)',
        },
      ],
    },

    {
      name: 'subtotal',
      type: 'number',
      required: true,
      min: 0,
      label: 'Subtotal',
    },

    {
      name: 'shipping',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      label: 'Envío',
    },

    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
      label: 'Total',
    },

    {
      name: 'couponCode',
      type: 'text',
      required: false,
      label: 'Cupón usado',
    },

    {
      name: 'discount',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      label: 'Descuento aplicado ($)',
    },

    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'processing',
      label: 'Estado',
      options: [
        { label: 'En camino', value: 'processing' },
        { label: 'Enviado', value: 'shipped' },
        { label: 'Entregado', value: 'delivered' },
        { label: 'Cancelado', value: 'cancelled' },
      ],
    },

    {
      name: 'payMethod',
      type: 'select',
      required: true,
      defaultValue: 'card',
      label: 'Método de pago',
      options: [
        { label: 'Tarjeta', value: 'card' },
        { label: 'PSE', value: 'pse' },
        { label: 'Contraentrega', value: 'cod' },
      ],
    },

    {
      name: 'contactName',
      type: 'text',
      required: true,
      label: 'Nombre',
    },

    {
      name: 'contactLastName',
      type: 'text',
      required: true,
      label: 'Apellido',
    },

    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      label: 'Correo',
    },

    {
      name: 'contactPhone',
      type: 'text',
      required: true,
      label: 'Teléfono',
    },

    {
      name: 'address',
      type: 'text',
      required: true,
      label: 'Dirección',
    },

    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'Ciudad',
    },

    {
      name: 'department',
      type: 'text',
      required: true,
      label: 'Departamento',
    },

    {
      name: 'postalCode',
      type: 'text',
      required: false,
      label: 'Código postal',
    },

    {
      name: 'notes',
      type: 'text',
      required: false,
      label: 'Indicaciones',
    },
  ],

  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && !data?.orderNumber) {
          const { totalDocs } = await req.payload.count({
            collection: 'orders',
          })
          const year = new Date().getFullYear()
          data.orderNumber = `TF-${year}-${String(totalDocs + 1).padStart(4, '0')}`
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create' && doc?.couponCode) {
          try {
            const found = await req.payload.find({
              collection: 'coupons',
              where: { code: { equals: String(doc.couponCode).toUpperCase() } },
              limit: 1,
            })
            const coupon = found.docs[0]
            if (coupon) {
              await req.payload.update({
                collection: 'coupons',
                id: coupon.id,
                data: { usedCount: (coupon.usedCount || 0) + 1 },
              })
            }
          } catch (error) {
            req.payload.logger.error(`No se pudo contar uso del cupón: ${error}`)
          }
        }
      },
    ],
  },

  access: {
    // Compra de invitados: cualquiera puede crear un pedido
    create: () => true,
    // Cada cliente ve solo sus pedidos (admins ven todo)
    read: ({ req }) => {
      if (!req.user) {
        return false
      }
      if (req.user.collection !== 'customers') {
        return true
      }
      return {
        customer: {
          equals: req.user.id,
        },
      }
    },
    // Solo admins pueden modificar/eliminar desde el panel
    update: ({ req }) => {
      return Boolean(req.user && req.user.collection !== 'customers')
    },
    delete: ({ req }) => {
      return Boolean(req.user && req.user.collection !== 'customers')
    },
  },
}
