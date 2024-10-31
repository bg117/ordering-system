"use client";

import { useAuth } from "@/components/AuthContextProvider";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  Container,
  Nav,
  Badge,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavLink,
} from "react-bootstrap";

export default function Header() {
  const { user } = useAuth();

  return (
    <Navbar expand="lg" className="bg-primary navbar-dark">
      <Container className="align-middle">
        <NavbarBrand href="/">
          <strong>Online Ordering System</strong>
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="menu" active>
              Menu
            </NavLink>
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <>
                <NavLink href="/cart" active>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faBasketShopping} className="fs-4" />
                    <Badge bg="secondary" className="ms-1">
                      0
                    </Badge>
                  </div>
                </NavLink>
                <NavLink href="/logout" active>
                  Log Out
                </NavLink>
              </>
            ) : (
              <NavLink href="/login" active>
                Log In
              </NavLink>
            )}
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
