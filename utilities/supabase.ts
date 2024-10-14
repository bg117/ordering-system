import { SupabaseClient } from "@supabase/supabase-js";

export const supabase = new SupabaseClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON_KEY as string
);
