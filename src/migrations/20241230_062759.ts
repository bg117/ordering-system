import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "order_items" DROP CONSTRAINT "order_items_user_id_users_id_fk";
  
  DROP INDEX IF EXISTS "order_items_user_idx";
  DROP INDEX IF EXISTS "order_items_item_idx";
  ALTER TABLE "items" ALTER COLUMN "description" SET DATA TYPE varchar;
  ALTER TABLE "users" ADD COLUMN "first_name" varchar NOT NULL;
  ALTER TABLE "users" ADD COLUMN "last_name" varchar NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "extra_instructions" varchar;
  CREATE INDEX IF NOT EXISTS "order_items_item_idx" ON "order_items" USING btree ("item_id");
  ALTER TABLE "media" DROP COLUMN IF EXISTS "alt";
  ALTER TABLE "order_items" DROP COLUMN IF EXISTS "user_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "order_items_item_idx";
  ALTER TABLE "items" ALTER COLUMN "description" SET DATA TYPE jsonb;
  ALTER TABLE "media" ADD COLUMN "alt" varchar NOT NULL;
  ALTER TABLE "order_items" ADD COLUMN "user_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "order_items" ADD CONSTRAINT "order_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "order_items_user_idx" ON "order_items" USING btree ("user_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "order_items_item_idx" ON "order_items" USING btree ("item_id");
  ALTER TABLE "users" DROP COLUMN IF EXISTS "first_name";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "last_name";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "extra_instructions";`)
}
