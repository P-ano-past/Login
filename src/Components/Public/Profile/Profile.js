import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidenav from "../../Sidenav/Sidenav";
import "./Profile.css";

export default function Profile() {
  return (
    <Container>
      <Row>
        <Col>
          <Sidenav />
        </Col>
      </Row>
    </Container>
  );
}
