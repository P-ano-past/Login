import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import "./Sidenav.css";

export default function Sidenav() {
  const userContext = useContext(UsernameContext);

  const profileUsername = userContext.profile.usernameContext;

  return (
    <Container>
      <Row id="dashNav">
        <Col className="sidenavText">Home</Col>
        <Col className="sidenavText">Explore</Col>
        <Col className="sidenavText">Notifications</Col>
        <Col className="sidenavText">Messages</Col>
        <Col className="sidenavText">Bookmarks</Col>
        <Col className="sidenavText">Lists</Col>
        <Col className="sidenavText">Profile</Col>
        <Col className="sidenavText">More</Col>

        <Col></Col>
        <Col>
          <div>
            <h3 id="welcome">
              Welcome,
              {profileUsername ? <p>{profileUsername}</p> : ""}
            </h3>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
