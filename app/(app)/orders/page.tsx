// app/queue/page.tsx

"use client";

import QueueOrders from "@/components/QueueOrders"; // Adjust path if needed

export default function OrdersPage() {
  const orders = [
    {
      id: 1,
      name: "John Doe",
      time: new Date(),
      total: 100,
      grade: 10,
      section: "A",
      items: ["Item 1", "Item 2"],
      instructions: "Extra ketchup",
    },
    {
      id: 2,
      name: "Jane Smith",
      time: new Date(),
      total: 150,
      grade: 11,
      section: "B",
      items: ["Item 3", "Item 4"],
      instructions: "No onions",
    },
  ];

  return (
    <div className="container">
      <h2 className="mb-4">Orders</h2>
      <QueueOrders orders={orders} />
    </div>
  );
}
