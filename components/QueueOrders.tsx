// components/QueueOrders.tsx

"use client";

import { useState } from "react";
import { Card, Button, Row, Col, Collapse } from "react-bootstrap";
import { faBell, faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Order = {
  id: number;
  name: string;
  time: Date;
  total: number;
  grade: number;
  section: string;
  items: string[];
  instructions?: string;
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
      {orders.map((order) => (
        <Card key={order.id} className="mb-3">
          <Card.Header
            onClick={() => toggleOrder(order.id)}
            style={{ cursor: "pointer" }}
          >
            <Row className="align-items-center">
              <Col xs={8}>
                <strong>{order.name}</strong>
              </Col>
              <Col xs={2}>
                <FontAwesomeIcon icon={faClock} className="me-2" />
                {order.time.toLocaleTimeString()}
              </Col>
              <Col xs={2}>
                <strong>₱{order.total.toFixed(2)}</strong>
              </Col>
            </Row>
          </Card.Header>
          <Collapse in={openOrders.includes(order.id)}>
            <Card.Body>
              <p>
                <strong>Order Details:</strong>
              </p>
              <p>
                <span role="img" aria-label="grade-level-section">
                  🏫
                </span>{" "}
                {order.grade} &ndash; {order.section}
              </p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              {order.instructions && (
                <p>
                  <strong>Special Instructions:</strong> {order.instructions}
                </p>
              )}
              <p>
                <strong>Expected Price:</strong> ₱{order.total.toFixed(2)}
              </p>
              <Row className="mt-3">
                <Col xs={4}>
                  <Button variant="dark" className="w-100">
                    <FontAwesomeIcon icon={faCheck} /> Mark as Done
                  </Button>
                </Col>
                <Col xs={4}>
                  <Button variant="light" className="w-100">
                    Mark as Received
                  </Button>
                </Col>
                <Col xs={4}>
                  <Button variant="secondary" className="w-100">
                    <FontAwesomeIcon icon={faBell} /> Notify User
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Collapse>
        </Card>
      ))}
    </>
  );
}
