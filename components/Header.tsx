"use client";

import { createClient } from "@/utilities/supabase/browser";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";

export default function Header() {
  const supabase = createClient();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(() => {
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [supabase.auth]);

  return (
    <Navbar expand="lg" className="bg-primary navbar-dark">
      <Container className="align-middle">
        <Navbar.Brand href="/">
          <strong>Online Ordering System</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="menu" active>
              Menu
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {loggedIn ? (
              <>
                <Nav.Link href="/cart" active>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faBasketShopping} className="fs-4" />
                    <Badge bg="secondary" className="ms-1">
                      0
                    </Badge>
                  </div>
                </Nav.Link>
                {/* TODO: name here */}
                <Nav.Link href="/logout" active>
                  Log Out
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login" active>
                Log In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
