import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "carts" CASCADE;
  ALTER TABLE "cart_items" DROP CONSTRAINT IF EXISTS "cart_items_cart_id_carts_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_carts_fk";
  
  DROP INDEX IF EXISTS "cart_items_cart_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_carts_id_idx";
  ALTER TABLE "cart_items" DROP COLUMN IF EXISTS "cart_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "carts_id";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "carts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "cart_items" ADD COLUMN "cart_id" integer NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "carts_id" integer;
  DO $$ BEGIN
   ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "carts_user_idx" ON "carts" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "carts_updated_at_idx" ON "carts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "carts_created_at_idx" ON "carts" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_carts_fk" FOREIGN KEY ("carts_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "cart_items_cart_idx" ON "cart_items" USING btree ("cart_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_carts_id_idx" ON "payload_locked_documents_rels" USING btree ("carts_id");`)
}
