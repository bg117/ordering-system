import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "cart_rels";
  DROP INDEX IF EXISTS "cart_user_idx";
  CREATE UNIQUE INDEX IF NOT EXISTS "cart_user_idx" ON "cart" USING btree ("user_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "cart_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"items_id" integer
  );
  
  DROP INDEX IF EXISTS "cart_user_idx";
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
  
  CREATE INDEX IF NOT EXISTS "cart_rels_order_idx" ON "cart_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "cart_rels_parent_idx" ON "cart_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "cart_rels_path_idx" ON "cart_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "cart_rels_items_id_idx" ON "cart_rels" USING btree ("items_id");
  CREATE INDEX IF NOT EXISTS "cart_user_idx" ON "cart" USING btree ("user_id");`)
}
