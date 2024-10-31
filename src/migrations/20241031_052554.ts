import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "queue" RENAME TO "orders";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "queue_id" TO "orders_id";
  ALTER TABLE "orders" DROP CONSTRAINT "queue_cart_id_carts_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_queue_fk";
  
  DROP INDEX IF EXISTS "queue_cart_idx";
  DROP INDEX IF EXISTS "queue_updated_at_idx";
  DROP INDEX IF EXISTS "queue_created_at_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_queue_id_idx";
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "orders_cart_idx" ON "orders" USING btree ("cart_id");
  CREATE INDEX IF NOT EXISTS "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "orders" RENAME TO "queue";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "orders_id" TO "queue_id";
  ALTER TABLE "queue" DROP CONSTRAINT "orders_cart_id_carts_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_orders_fk";
  
  DROP INDEX IF EXISTS "orders_cart_idx";
  DROP INDEX IF EXISTS "orders_updated_at_idx";
  DROP INDEX IF EXISTS "orders_created_at_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_orders_id_idx";
  DO $$ BEGIN
   ALTER TABLE "queue" ADD CONSTRAINT "queue_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_queue_fk" FOREIGN KEY ("queue_id") REFERENCES "public"."queue"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "queue_cart_idx" ON "queue" USING btree ("cart_id");
  CREATE INDEX IF NOT EXISTS "queue_updated_at_idx" ON "queue" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "queue_created_at_idx" ON "queue" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_queue_id_idx" ON "payload_locked_documents_rels" USING btree ("queue_id");`)
}
