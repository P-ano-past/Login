import React, { useContext } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import { Button, Row, Col, Container } from "react-bootstrap";

export default function Public() {
  const userContext = useContext(UsernameContext);
  const profileUsername = userContext.profile.usernameContext;

  return (
    <Container>
      <Row>
        <Col>{profileUsername}</Col>
      </Row>
    </Container>
  );
}
