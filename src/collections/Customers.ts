import type { CollectionConfig } from 'payload'
import { welcomeEmail } from '../utilities/emailTemplates'

export const Customers: CollectionConfig = {
  slug: 'customers',

  auth: true,

  access: {
    create: () => true,
  },
  admin: {
    useAsTitle: 'email',
  },

  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') {
          return
        }

        // El correo nunca debe romper el registro: si falla, solo se registra
        try {
          const { subject, html } = welcomeEmail({ firstName: doc.firstName })

          await req.payload.sendEmail({
            to: doc.email,
            subject,
            html,
          })
        } catch (error) {
          req.payload.logger.warn(
            `Registro OK (${doc.email}), pero falló el correo de bienvenida: ${error}`,
          )
        }
      },
    ],
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

    {
      name: 'googleId',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        description: 'ID de la cuenta de Google vinculada (si inició sesión con Google).',
      },
    },
  ],
}
