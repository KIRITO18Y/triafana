import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`customers\` ADD \`google_id\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`customers_google_id_idx\` ON \`customers\` (\`google_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`customers_google_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`customers\` DROP COLUMN \`google_id\`;`)
}
