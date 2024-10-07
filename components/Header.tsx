"use client";

import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";

interface HeaderProps {
  hideNavLinks?: boolean;  
  showCart?: boolean;      
  showName?: boolean;      
}

export default function Header({ hideNavLinks = false, showCart = false, showName = false }: HeaderProps) {
  const [loggedIn] = useState(false);  

  return (
    <Navbar expand="lg" className="bg-primary navbar-dark">
      <Container className="align-middle">
        <Navbar.Brand href="/">
          <strong>PoodFanda</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!hideNavLinks && (
            <Nav className="me-auto">
              <Nav.Link href="menu">Menu</Nav.Link>
            </Nav>
          )}
          <Nav className="ms-auto d-flex align-items-center">
            {/* Cart Icon */}
            {showCart && (
              <Nav.Link href="cart">
                <FontAwesomeIcon icon={faBasketShopping} className="fs-4" />
                <Badge bg="gray-300">0</Badge>
              </Nav.Link>
            )}
            {/* Name Text */}
            {showName && (
              <span style={{ marginLeft: "20px", position: "relative", top: "0px", fontSize: "16px", color: "white"}}>
                Name
              </span>
            )}
            {/* Log In Button - Only shows if showCart and showName are false haha sorry */}
            {!loggedIn && !showCart && !showName && (
              <Nav.Link href="login">Log In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
