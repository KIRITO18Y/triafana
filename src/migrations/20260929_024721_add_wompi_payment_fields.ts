import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`orders\` ADD \`shipping_address\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`shipping_city\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`shipping_department\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`shipping_postal_code\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`shipping_notes\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`shipping_phone\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`reference\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`payment_status\` text DEFAULT 'PENDING';`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`wompi_transaction_id\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`payment_method_type\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_reference_idx\` ON \`orders\` (\`reference\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`orders_reference_idx\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`shipping_address\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`shipping_city\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`shipping_department\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`shipping_postal_code\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`shipping_notes\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`shipping_phone\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`reference\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`payment_status\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`wompi_transaction_id\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`payment_method_type\`;`)
}
