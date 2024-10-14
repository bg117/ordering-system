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
          <strong>PoodFanda</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="menu">Menu</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {loggedIn ? (
              <Nav.Link href="cart">
                <FontAwesomeIcon icon={faBasketShopping} className="fs-4" />
                <Badge bg="gray-300">0</Badge>
              </Nav.Link>
            ) : (
              <Nav.Link href="login">Log In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
