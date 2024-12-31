import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP INDEX IF EXISTS "cart_items_item_idx";
  ALTER TABLE "cart_items" ADD COLUMN "placed" boolean DEFAULT false;
  CREATE UNIQUE INDEX IF NOT EXISTS "cart_items_item_idx" ON "cart_items" USING btree ("item_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP INDEX IF EXISTS "cart_items_item_idx";
  CREATE INDEX IF NOT EXISTS "cart_items_item_idx" ON "cart_items" USING btree ("item_id");
  ALTER TABLE "cart_items" DROP COLUMN IF EXISTS "placed";`)
}
