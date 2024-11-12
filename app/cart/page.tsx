// pages/cart.tsx
"use client";

import { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import CartItem from "../../components/CartItem";

type CartItemType = {
  name: string;
  quantity: number;
  price: number;
};

const cartItems: CartItemType[] = [
  { name: "Karapatan", quantity: 2, price: 999.99 },
  { name: "With High Honors", quantity: 1, price: 499.50 },
  { name: "Line of 9 Grades", quantity: 2, price: 299.99 },
];

export default function CartPage() {
  const [instructions, setInstructions] = useState("");
  const [cutlery, setCutlery] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
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
                  <CartItem key={index} name={item.name} quantity={item.quantity} price={item.price} />
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
          <Card>
            <Card.Body>
              <Card.Title>Additional Instructions</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">Customize your order</Card.Subtitle>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Custom Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter any special instructions or requests"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cutleryCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I need cutlery"
                    checked={cutlery}
                    onChange={(e) => setCutlery(e.target.checked)}
                  />
                </Form.Group>
                <Button variant="dark" className="w-100" onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
