import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_orders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order_number\` text NOT NULL,
  	\`customer_id\` integer,
  	\`subtotal\` numeric NOT NULL,
  	\`shipping\` numeric DEFAULT 0 NOT NULL,
  	\`total\` numeric NOT NULL,
  	\`coupon_code\` text,
  	\`discount\` numeric DEFAULT 0 NOT NULL,
  	\`status\` text DEFAULT 'processing' NOT NULL,
  	\`pay_method\` text DEFAULT 'card' NOT NULL,
  	\`contact_name\` text NOT NULL,
  	\`contact_last_name\` text NOT NULL,
  	\`contact_email\` text NOT NULL,
  	\`contact_phone\` text NOT NULL,
  	\`address\` text NOT NULL,
  	\`city\` text NOT NULL,
  	\`department\` text NOT NULL,
  	\`postal_code\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_orders\`("id", "order_number", "customer_id", "subtotal", "shipping", "total", "coupon_code", "discount", "status", "pay_method", "contact_name", "contact_last_name", "contact_email", "contact_phone", "address", "city", "department", "postal_code", "notes", "updated_at", "created_at") SELECT "id", "order_number", "customer_id", "subtotal", "shipping", "total", "coupon_code", "discount", "status", "pay_method", "contact_name", "contact_last_name", "contact_email", "contact_phone", "address", "city", "department", "postal_code", "notes", "updated_at", "created_at" FROM \`orders\`;`)
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`ALTER TABLE \`__new_orders\` RENAME TO \`orders\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_order_number_idx\` ON \`orders\` (\`order_number\`);`)
  await db.run(sql`CREATE INDEX \`orders_customer_idx\` ON \`orders\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_updated_at_idx\` ON \`orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_at_idx\` ON \`orders\` (\`created_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_orders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order_number\` text NOT NULL,
  	\`customer_id\` integer NOT NULL,
  	\`subtotal\` numeric NOT NULL,
  	\`shipping\` numeric DEFAULT 0 NOT NULL,
  	\`total\` numeric NOT NULL,
  	\`coupon_code\` text,
  	\`discount\` numeric DEFAULT 0 NOT NULL,
  	\`status\` text DEFAULT 'processing' NOT NULL,
  	\`pay_method\` text DEFAULT 'card' NOT NULL,
  	\`contact_name\` text NOT NULL,
  	\`contact_last_name\` text NOT NULL,
  	\`contact_email\` text NOT NULL,
  	\`contact_phone\` text NOT NULL,
  	\`address\` text NOT NULL,
  	\`city\` text NOT NULL,
  	\`department\` text NOT NULL,
  	\`postal_code\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_orders\`("id", "order_number", "customer_id", "subtotal", "shipping", "total", "coupon_code", "discount", "status", "pay_method", "contact_name", "contact_last_name", "contact_email", "contact_phone", "address", "city", "department", "postal_code", "notes", "updated_at", "created_at") SELECT "id", "order_number", "customer_id", "subtotal", "shipping", "total", "coupon_code", "discount", "status", "pay_method", "contact_name", "contact_last_name", "contact_email", "contact_phone", "address", "city", "department", "postal_code", "notes", "updated_at", "created_at" FROM \`orders\`;`)
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`ALTER TABLE \`__new_orders\` RENAME TO \`orders\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_order_number_idx\` ON \`orders\` (\`order_number\`);`)
  await db.run(sql`CREATE INDEX \`orders_customer_idx\` ON \`orders\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_updated_at_idx\` ON \`orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_at_idx\` ON \`orders\` (\`created_at\`);`)
}
