import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "orders_rels" CASCADE;
  ALTER TABLE "order_items" ADD COLUMN "order_id_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_id_orders_id_fk" FOREIGN KEY ("order_id_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "order_items_order_id_idx" ON "order_items" USING btree ("order_id_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "orders_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"order_items_id" integer
  );
  
  ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_id_orders_id_fk";
  
  DROP INDEX IF EXISTS "order_items_order_id_idx";
  DO $$ BEGIN
   ALTER TABLE "orders_rels" ADD CONSTRAINT "orders_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders_rels" ADD CONSTRAINT "orders_rels_order_items_fk" FOREIGN KEY ("order_items_id") REFERENCES "public"."order_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "orders_rels_order_idx" ON "orders_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "orders_rels_parent_idx" ON "orders_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "orders_rels_path_idx" ON "orders_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "orders_rels_order_items_id_idx" ON "orders_rels" USING btree ("order_items_id");
  ALTER TABLE "order_items" DROP COLUMN IF EXISTS "order_id_id";`)
}
