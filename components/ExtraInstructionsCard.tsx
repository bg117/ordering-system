"use client";

import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function ExtraInstructionsCard() {
    const [instructions, setInstructions] = useState("");
    const [cutlery, setCutlery] = useState(false);

    return (
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
                    <Button variant="dark" className="w-100">
                        Place Order
                    </Button>
                </Form>
            </Card.Body>
        </Card >
    )
}