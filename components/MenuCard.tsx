"use client";

import { Card, Button } from "react-bootstrap";

interface MenuCardProps {
  name: string;
  description: string;
  image: string;
  price?: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ name, description, image, price }) => {
  return (
    <Card style={{ height: '100%', width: '18rem' }} className="mt-3">
      <Card.Img variant="top" src={image} alt={name} />
      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <div>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {price !== undefined && (
            <span style={{ fontWeight: 'normal', color: 'black', fontSize: '1.25rem' }}>
              ₱{price.toFixed(2)}
            </span>
          )}
          <Button variant="primary">Add to Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MenuCard;
