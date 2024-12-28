"use client";

import { useAuth } from "@/components/AuthContextProvider";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { user, isAdmin } = useAuth();

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (!isAdmin || user === null) {
    redirect("/menu");
  }

  return (
    <main>
      <h1>Home</h1>
      <p>Welcome to the Online Ordering System.</p>
      <p>
        <span>Logged in as {user.email}</span>
        <br />
      </p>
      <h3>Quick Links for Admins</h3>
      <ul>
        <li>
          <Link href="/admin">Admin Panel</Link>
        </li>
        <li>
          <Link href="/orders">Orders</Link>
        </li>
      </ul>
    </main>
  );
}
