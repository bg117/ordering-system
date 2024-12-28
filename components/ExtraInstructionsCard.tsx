"use client";

import { Card, Form, Button } from "react-bootstrap";

type ExtraInstructionsCardProps = {
  instructions: string;
  onChangeInstructions: (instructions: string) => void;
  onSubmit: () => void;
};

export default function ExtraInstructionsCard({
  instructions,
  onChangeInstructions,
  onSubmit,
}: ExtraInstructionsCardProps) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Additional Instructions</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          Customize your order
        </Card.Subtitle>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Custom Instructions</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter any special instructions or requests"
              value={instructions}
              onChange={(e) => onChangeInstructions(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" className="w-100" onClick={onSubmit}>
            Place Order
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
