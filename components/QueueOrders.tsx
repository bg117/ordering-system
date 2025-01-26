// components/QueueOrders.tsx

"use client";

import { useState } from "react";
import { Card, Button, Row, Col, Collapse } from "react-bootstrap";
import { faBell, faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Item, User } from "@/payload-types";

type Order = {
  id: number;
  placedAt: string;
  total: number;
  user: User;
  instructions?: string;
  orderItems: {
    item: Item;
    quantity: number;
    total: number;
  }[];
};

interface QueueOrdersProps {
  orders: Order[];
}

export default function QueueOrders({ orders }: QueueOrdersProps) {
  const [openOrders, setOpenOrders] = useState<number[]>([]);

  const toggleOrder = (id: number) => {
    setOpenOrders((prevOpenOrders) =>
      prevOpenOrders.includes(id)
        ? prevOpenOrders.filter((orderId) => orderId !== id)
        : [...prevOpenOrders, id]
    );
  };

  return (
    <>
      {orders.map((order) => {
        return (
          <Card key={order.id} className="mb-3">
            <Card.Header
              onClick={() => toggleOrder(order.id)}
              style={{ cursor: "pointer" }}
            >
              <Row className="align-items-center">
                <Col xs={3} lg={4}>
                  <strong>
                    {order.user.lastName}, {order.user.firstName}
                  </strong>
                </Col>
                <Col xs={2} lg={2}>
                  <strong>
                    {order.user.grade} &ndash; {order.user.section}
                  </strong>
                </Col>
                <Col xs={4} lg={3}>
                  <FontAwesomeIcon icon={faClock} className="me-2" />
                  {new Date(order.placedAt).toLocaleTimeString()}
                </Col>
                <Col xs={2} lg={2}>
                  <strong>₱{order.total.toFixed(2)}</strong>
                </Col>
                <Col xs={1}>
                {/* circular button with checkmark icon */}
                  <Button
                    variant="outline-dark"
                    className="rounded-circle"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Mark as Done clicked");
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Collapse in={openOrders.includes(order.id)}>
              <Card.Body>
                <h5>Order</h5>
                <ul>
                  {order.orderItems.map((item, index) => (
                    <li key={index}>
                      {item.item.name} × {item.quantity} – <strong>₱
                      {item.total.toFixed(2)}</strong>
                    </li>
                  ))}
                </ul>
                {order.instructions && (
                  <p>
                    <strong>Special Instructions:</strong> {order.instructions}
                  </p>
                )}
                <h5>₱{order.total.toFixed(2)}</h5>
              </Card.Body>
            </Collapse>
          </Card>
        );
      })}
    </>
  );
}
