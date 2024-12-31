import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "cart_items" ADD COLUMN "user_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "cart_items_user_idx" ON "cart_items" USING btree ("user_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_user_id_users_id_fk";
  
  DROP INDEX IF EXISTS "cart_items_user_idx";
  ALTER TABLE "cart_items" DROP COLUMN IF EXISTS "user_id";`)
}
