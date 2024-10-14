"use client";

import Page from "@/components/Page";
import { useCallback, useEffect, useState } from "react";
import { Form, Button, Card, Modal, InputGroup } from "react-bootstrap";

export default function Login() {
  const [showModal, setShowModal] = useState<boolean | undefined>(undefined);
  const [isStudent, setIsStudent] = useState<boolean | undefined>(undefined);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleNotStudent = useCallback(() => {
    setIsStudent(false);
    setShowModal(false);
  }, []);

  const handleStudent = useCallback(() => {
    setIsStudent(true);
    setShowModal(false);
  }, []);

  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  useEffect(() => {
    setShowModal(true);
  }, []);

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
            <Form>
              <h2 className="text-center mb-4">Login</h2>
              <Form.Group controlId="formId" className="mb-2">
                <Form.Label>
                  {isStudent === undefined
                    ? "Are you a student or a canteen staff?"
                    : isStudent
                    ? "Learner's Reference Number"
                    : "Employee Number"}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    required
                    onChange={handleUsernameChange}
                  />
                  {isStudent !== undefined && (
                    <InputGroup.Text>
                      {isStudent ? "@r4a-2.deped.gov.ph" : "@deped.gov.ph"}
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={handlePasswordChange}
                />
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
