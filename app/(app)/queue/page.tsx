// app/queue/page.tsx

"use client";

import QueueOrders from "../../components/QueueOrders"; // Adjust path if needed

const orders = [
  {
    id: 1,
    name: "Kian Gabriel Arambulo",
    email: "mansanas@gmail.com",
    time: "08:30 PM",
    price: 15.99,
    gradeLevelAndSection: "Grade 10 - Bohr",
    items: ["karapatan", "pagmamahal", "kabaitan"],
    instructions: "hi",
    cutlery: true,
  },
  {
    id: 2,
    name: "Ivy Shanelle Ysmael",
    email: "ivyysmael@gmail.com",
    time: "01:43 PM",
    price: 8.24,
    gradeLevelAndSection: "Grade 10 - Bohr",
    items: ["math wizard", "nakasalamin", "with high honors"],
    instructions: "pakikuha po sa 10 bohr thanks",
    cutlery: false,
  },
  {
    id: 3,
    name: "Tristan Eutaro Facundo",
    email: "tristan@gmail.com",
    time: "05:40 PM",
    price: 10.25,
    gradeLevelAndSection: "Grade 10 - Bohr",
    items: ["malinis na utak", "grade 9"],
    instructions: "none",
    cutlery: true,
  }
  
];

export default function QueuePage() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Queue</h2>
      <QueueOrders orders={orders} />
    </div>
  );
}
