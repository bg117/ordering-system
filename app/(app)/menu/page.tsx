"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/utilities/api";

import MenuCard from "@/components/MenuCard";
import { PaginatedDocs } from "payload";
import { Item, Media } from "@/payload-types";
import { useAuth } from "@/components/AuthContextProvider";
import Link from "next/link";

export default function Menu() {
  const {
    status: queryStatus,
    data,
    error,
  } = useQuery<PaginatedDocs<Item>>({
    queryKey: ["menu"],
    queryFn: async () => {
      const response = await api("/items", { method: "GET" });
      return response;
    },
  });

  const { status: userStatus } = useAuth();

  if (userStatus === "admin") {
    return (
      <main>
        <h1>Menu</h1>
        <p>
          Admins cannot view the menu. Access items through the{" "}
          <Link href="/admin">Admin Panel</Link>.
        </p>
      </main>
    );
  }

  if (queryStatus === "pending") return <div>Loading...</div>;
  if (queryStatus === "error") throw error;

  return (
    <main className="container">
      <h1>Menu</h1>

      <div className="row g-2 mt-1">
        {data.docs.map(({ id, name, description, price, image }) => (
          <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <MenuCard
              id={id}
              name={name}
              description={JSON.stringify(description)}
              price={price}
              image={(image as Media).url || ""}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
