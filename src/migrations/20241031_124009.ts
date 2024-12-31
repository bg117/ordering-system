import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "orders" DROP CONSTRAINT "orders_cart_id_carts_id_fk";
  
  DROP INDEX IF EXISTS "orders_cart_idx";
  ALTER TABLE "orders" ADD COLUMN "user_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "orders_user_idx" ON "orders" USING btree ("user_id");
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "cart_id";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_users_id_fk";
  
  DROP INDEX IF EXISTS "orders_user_idx";
  ALTER TABLE "orders" ADD COLUMN "cart_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "orders_cart_idx" ON "orders" USING btree ("cart_id");
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "user_id";`)
}
