import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users" ADD COLUMN "grade" numeric NOT NULL;
  ALTER TABLE "users" ADD COLUMN "section" varchar NOT NULL;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "users" DROP COLUMN IF EXISTS "grade";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "section";`)
}
