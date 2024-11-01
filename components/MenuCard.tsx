"use client";

import { Card, Button, CardBody, CardImg, CardText, CardTitle } from "react-bootstrap";

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
    <Card className="h-100">
      <CardImg variant="top" src={image} alt={name} />
      <CardBody className="d-flex h-100 flex-column">
        <div className="mb-3">
          <CardTitle>{name}</CardTitle>
          <CardText>{description}</CardText>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          {price !== undefined && (
            <span className="fw-normal text-black fs-4">
              ₱{price.toFixed(2)}
            </span>
          )}
          <Button variant="primary">Add to Cart</Button>
        </div>
      </CardBody>
    </Card>
  );
}
