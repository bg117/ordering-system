"use client";

import { useAuth } from "@/components/AuthContextProvider";
import CartItem from "@/components/CartItem";
import ExtraInstructionsCard from "@/components/ExtraInstructionsCard";
import { CartItem as CartItemType, Item } from "@/payload-types";
import { api } from "@/utilities/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PaginatedDocs } from "payload";
import { Row, Col, Card } from "react-bootstrap";

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery<PaginatedDocs<CartItemType>>({
    queryKey: ["cart-items"],
    queryFn: async () => {
      const response = await api("/cart-items", { method: "GET" });
      return response;
    }
  });

  if (user === null) {
    router.push("/login");
  }

  if (isLoading || !data || user === undefined) {
    return <div>Loading...</div>
  }

  if (isError) {
    throw error;
  }

  const cartItems = data.docs;

  if (cartItems.length === 0 || !cartItems) {
    return <div>Your cart is empty</div>
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.item as Item).price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mt-5">
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">Review your order details</Card.Subtitle>
              <div>
                {cartItems.map((item, index) => (
                  <CartItem key={index} name={(item.item as Item).name} quantity={item.quantity} price={(item.item as Item).price} />
                ))}
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong>₱{calculateTotal()}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <ExtraInstructionsCard />
        </Col>
      </Row>
    </div>
  );
}

