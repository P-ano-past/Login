import React from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Navigation() {
  return (
    <Navbar>
      <Nav className="mr-auto">
        <Nav.Link href="/Home">About</Nav.Link>
        <Nav.Link href="/Blog">Blog</Nav.Link>
        <Nav.Link href="/Contact">Contact</Nav.Link>
      </Nav>
    </Navbar>
  );
}
