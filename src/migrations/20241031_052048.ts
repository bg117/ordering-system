import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "queue" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cart_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "queue_id" integer;
  DO $$ BEGIN
   ALTER TABLE "queue" ADD CONSTRAINT "queue_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "queue_cart_idx" ON "queue" USING btree ("cart_id");
  CREATE INDEX IF NOT EXISTS "queue_updated_at_idx" ON "queue" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "queue_created_at_idx" ON "queue" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_queue_fk" FOREIGN KEY ("queue_id") REFERENCES "public"."queue"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_queue_id_idx" ON "payload_locked_documents_rels" USING btree ("queue_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "queue";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_queue_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_queue_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "queue_id";`)
}
