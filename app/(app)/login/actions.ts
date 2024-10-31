"use server";

import { payload } from "@/utilities/payload";
import { redirect } from "next/navigation";
import { AuthenticationError } from "payload";

export async function login(_: string | null, formData: FormData) {
  const id = formData.get("id") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await payload.login({
      collection: "users",
      data: {
        email: id + email,
        password,
      },
    });
  } catch (error) {
    const { message } = error as AuthenticationError;
    return message;
  }

  redirect("/");
}
