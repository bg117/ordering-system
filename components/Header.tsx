"use client";

import { useAuth } from "@/components/AuthContextProvider";
import { api } from "@/utilities/api";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
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
  const { status: userStatus, logout } = useAuth();
  const { status: queryStatus, data } = useQuery({
    queryKey: ["cart-items", "count"],
    queryFn: async () => {
      const response = await api("/cart-items/count", { method: "GET" });
      return response;
    },
  });

  return (
    <Navbar expand="lg" className="bg-primary navbar-dark">
      <Container className="align-middle">
        <NavbarBrand href="/">
          <strong>Online Ordering System</strong>
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userStatus === "admin" ? (
              <>
                <NavLink href="admin" active>
                  Admin Panel
                </NavLink>
                <NavLink href="orders" active>
                  Orders
                </NavLink>
              </>
            ) : (
              <NavLink href="menu" active>
                Menu
              </NavLink>
            )}
          </Nav>
          <Nav className="ms-auto">
            {userStatus !== "loading" &&
            userStatus !== "logged-out" &&
            queryStatus === "success" ? (
              <>
                {userStatus === "user" && (
                  <NavLink href="/cart" active>
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon
                        icon={faBasketShopping}
                        className="fs-4"
                      />
                      <Badge bg="secondary" className="ms-1">
                        {data.totalDocs}
                      </Badge>
                    </div>
                  </NavLink>
                )}
                <NavLink href="#" active onClick={logout}>
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
