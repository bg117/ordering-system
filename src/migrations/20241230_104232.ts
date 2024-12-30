import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "order_items" RENAME COLUMN "order_id_id" TO "order_id";
  ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_id_orders_id_fk";
  
  DROP INDEX IF EXISTS "order_items_order_id_idx";
  DO $$ BEGIN
   ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "order_items_order_idx" ON "order_items" USING btree ("order_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "order_items" RENAME COLUMN "order_id" TO "order_id_id";
  ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_orders_id_fk";
  
  DROP INDEX IF EXISTS "order_items_order_idx";
  DO $$ BEGIN
   ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_id_orders_id_fk" FOREIGN KEY ("order_id_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "order_items_order_id_idx" ON "order_items" USING btree ("order_id_id");`)
}