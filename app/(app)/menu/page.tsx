"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/utilities/api";

import MenuCard from "@/components/MenuCard";
import { PaginatedDocs } from "payload";
import { Item, Media } from "@/payload-types";

export default function Menu() {
  const { data, isLoading, isError, error } = useQuery<PaginatedDocs<Item>>({
    queryKey: ["menu"],
    queryFn: async () => {
      const response = await api("/items", { method: "GET" });
      return response;
    },
  });

  if (isLoading || !data) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <main className="container">
      <h1>Menu</h1>

      <div className="row d-flex justify-content-start g-4">
        {data.docs.map(({ id, name, description, price, image }) => (
          <MenuCard
            key={id}
            name={name}
            description={JSON.stringify(description)}
            price={price}
            image={(image as Media).url || ""}
          />
        ))}
      </div>
    </main>
  );
}
