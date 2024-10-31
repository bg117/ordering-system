"use server";

import { createClient } from "@/utilities/supabase/server";
import { redirect } from "next/navigation";

export async function login(prevState: string | null, formData: FormData) {
  const supabase = createClient();
  const id = formData.get("id") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log(`${id}${email},${password}`);

  const { error } = await supabase.auth.signInWithPassword({
    email: `${id}${email}`,
    password,
  });

  if (error) {
    return error.message;
  }

  redirect("/");
}
