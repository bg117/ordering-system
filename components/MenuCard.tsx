"use client";

import { Card, Button } from "react-bootstrap";

interface MenuCardProps {
  name: string;
  description: string;
  image: string;
  price?: number;
}

export default function MenuCard({
  name,
  description,
  image,
  price,
}: MenuCardProps) {
  return (
    <Card className="h-100 col-12 col-sm-6 col-md-4 col-lg-3">
      <Card.Img variant="top" src={image} alt={name} />
      <Card.Body>
        <div className="mb-3">
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          {price !== undefined && (
            <span className="fw-normal text-black fs-4">
              ₱{price.toFixed(2)}
            </span>
          )}
          <Button variant="primary">Add to Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
