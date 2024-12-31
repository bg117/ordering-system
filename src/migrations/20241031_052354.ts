import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "cart" RENAME TO "carts";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "cart_id" TO "carts_id";
  ALTER TABLE "carts" DROP CONSTRAINT "cart_user_id_users_id_fk";
  
  ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cart_id_cart_id_fk";
  
  ALTER TABLE "queue" DROP CONSTRAINT "queue_cart_id_cart_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cart_fk";
  
  DROP INDEX IF EXISTS "cart_user_idx";
  DROP INDEX IF EXISTS "cart_updated_at_idx";
  DROP INDEX IF EXISTS "cart_created_at_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_cart_id_idx";
  DO $$ BEGIN
   ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "queue" ADD CONSTRAINT "queue_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_carts_fk" FOREIGN KEY ("carts_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "carts_user_idx" ON "carts" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "carts_updated_at_idx" ON "carts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "carts_created_at_idx" ON "carts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_carts_id_idx" ON "payload_locked_documents_rels" USING btree ("carts_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "carts" RENAME TO "cart";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "carts_id" TO "cart_id";
  ALTER TABLE "cart" DROP CONSTRAINT "carts_user_id_users_id_fk";
  
  ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cart_id_carts_id_fk";
  
  ALTER TABLE "queue" DROP CONSTRAINT "queue_cart_id_carts_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_carts_fk";
  
  DROP INDEX IF EXISTS "carts_user_idx";
  DROP INDEX IF EXISTS "carts_updated_at_idx";
  DROP INDEX IF EXISTS "carts_created_at_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_carts_id_idx";
  DO $$ BEGIN
   ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "queue" ADD CONSTRAINT "queue_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cart_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "cart_user_idx" ON "cart" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "cart_updated_at_idx" ON "cart" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "cart_created_at_idx" ON "cart" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cart_id_idx" ON "payload_locked_documents_rels" USING btree ("cart_id");`)
}
