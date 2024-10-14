"use client";

import { supabase } from "@/utilities/supabase";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      setLoggedIn(session !== null);
    });
  }, []);

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
