import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "cart" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "cart_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"items_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cart_id" integer;
  DO $$ BEGIN
   ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cart_rels" ADD CONSTRAINT "cart_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cart"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cart_rels" ADD CONSTRAINT "cart_rels_items_fk" FOREIGN KEY ("items_id") REFERENCES "public"."items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "cart_user_idx" ON "cart" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "cart_updated_at_idx" ON "cart" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "cart_created_at_idx" ON "cart" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "cart_rels_order_idx" ON "cart_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "cart_rels_parent_idx" ON "cart_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "cart_rels_path_idx" ON "cart_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "cart_rels_items_id_idx" ON "cart_rels" USING btree ("items_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cart_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cart_id_idx" ON "payload_locked_documents_rels" USING btree ("cart_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "cart";
  DROP TABLE "cart_rels";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cart_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_cart_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "cart_id";`)
}
