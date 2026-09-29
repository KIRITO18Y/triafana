import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`promo_banner\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`eyebrow\` text DEFAULT 'Promociones',
  	\`title\` text DEFAULT 'Hasta 30% en tecnología seleccionada' NOT NULL,
  	\`description\` text DEFAULT 'Renueva tus equipos esta temporada. Ofertas por tiempo limitado en computadores, audio y accesorios.',
  	\`icon\` text DEFAULT '🔥',
  	\`button_text\` text DEFAULT 'Ver ofertas',
  	\`button_link\` text DEFAULT '/tecnology',
  	\`second_button_text\` text DEFAULT 'Todas las promos',
  	\`second_button_link\` text DEFAULT '/store',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`promo_banner\`;`)
}
