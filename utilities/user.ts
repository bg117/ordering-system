"use server";

import { User } from "@/payload-types";

export async function getUser() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/users/me`, {
    credentials: "include",
  });
  const data = await res.json();
  const { user } = data as { user: null | User };

  return user;
}
