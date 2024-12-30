// app/queue/page.tsx

"use client";

import QueueOrders from "@/components/QueueOrders"; // Adjust path if needed
import { api } from "@/utilities/api";
import { useQuery } from "@tanstack/react-query";

export default function OrdersPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api("/orders", {
        method: "GET",
      });
      return response;
    },
  });

  if (isLoading) return <span>Loading...</span>;
  if (isError) throw error;

  const { docs: orders } = data;

  return (
    <div className="container">
      <h2 className="mb-4">Orders</h2>
      <QueueOrders orders={orders} />
    </div>
  );
}
