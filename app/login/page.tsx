"use client";

import Page from "@/components/Page";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button, Card, Modal } from "react-bootstrap";

export default function Login() {
  const [showModal, setShowModal] = useState<boolean | undefined>(undefined);
  const [isStudent, setIsStudent] = useState<boolean | undefined>(undefined);
  const router = useRouter(); 

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (isStudent) {
      router.push("/menu"); 
    } else {
      router.push("/queue"); 
    }
  };

  return (
    <Page>
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
            <Form onSubmit={handleSubmit}>
              <h2 className="text-center mb-4">Login</h2>
              <Form.Group controlId="formId" className="mb-2">
                <Form.Label>
                  {isStudent === undefined
                    ? "Are you a student or a canteen staff?"
                    : isStudent
                    ? "Learner's Reference Number"
                    : "Employee Number"}
                </Form.Label>
                <Form.Control type="text" required />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required />
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
    </Page>
  );
}
