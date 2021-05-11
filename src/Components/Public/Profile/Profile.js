import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Profile.css";

export default function Profile() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>THIS IS THE PROFILE</h1>
          <Button
            onClick={() => {
              console.log("this button was clicked");
            }}
          >
            Test
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
