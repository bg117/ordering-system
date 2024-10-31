"use client";

import { useActionState, useCallback, useEffect, useState } from "react";
import { Form, Button, Card, Modal, InputGroup, Alert } from "react-bootstrap";
import { login } from "./actions";

export default function Login() {
  const [showModal, setShowModal] = useState<boolean | undefined>(undefined);
  const [isStudent, setIsStudent] = useState<boolean | undefined>(undefined);

  const [error, loginAction] = useActionState(login, null);

  const email = isStudent ? "@r4a-2.deped.gov.ph" : "@deped.gov.ph";

  const handleNotStudent = useCallback(() => {
    setIsStudent(false);
    setShowModal(false);
  }, []);

  const handleStudent = useCallback(() => {
    setIsStudent(true);
    setShowModal(false);
  }, []);

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <main>
      <Modal show={showModal} centered>
        <Modal.Header>
          <Modal.Title>Welcome!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>To continue, please log in as a:</span>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="text-white"
            onClick={handleStudent}
          >
            Student
          </Button>
          <Button
            variant="primary"
            className="text-white"
            onClick={handleNotStudent}
          >
            Canteen Staff
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <Card className="w-lg-50 mx-auto">
          <Card.Body>
            <Form action={loginAction}>
              {error && <Alert variant="danger">Error: {error}</Alert>}
              <h2 className="text-center mb-4">Login</h2>
              <Form.Group className="mb-2">
                <Form.Label htmlFor="id">
                  {isStudent === undefined
                    ? "Are you a student or a canteen staff?"
                    : isStudent
                    ? "Learner's Reference Number"
                    : "Employee Number"}
                </Form.Label>
                <InputGroup>
                  <Form.Control type="text" name="id" required />
                  {isStudent !== undefined && (
                    <InputGroup.Text>
                      <input type="hidden" name="email" value={email} />
                      {email}
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control type="password" name="password" required />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-3 text-white"
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </main>
  );
}
