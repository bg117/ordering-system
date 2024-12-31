"use client";

import { useAuth } from "@/components/AuthContextProvider";
import Link from "next/link";
import { redirect } from "next/navigation";
import {statSync} from "node:fs";

export default function Home() {
  const { user, status } = useAuth();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "user" || status === "logged-out") redirect("/menu");

  return (
    <main>
      <h1>Home</h1>
      <p>Welcome to the Online Ordering System.</p>
      <p>
        <span>Logged in as {user?.email}</span>
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
