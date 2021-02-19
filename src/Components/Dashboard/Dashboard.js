import { Container, Row, Col } from "react-bootstrap";
import React, { useContext } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import NewPost from "./NewPost/NewPost";
import Feed from "../Public/Feed";

export default function Dashboard() {
  const userContext = useContext(UsernameContext);
  // console.log(userContext);

  const profileUsername = userContext.profile.usernameContext;

  return (
    <Container>
      <Row>
        <Col>
          <h3>
            Welcome,
            {profileUsername ? <p>{profileUsername}</p> : ""}
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <NewPost />
        </Col>
      </Row>
      <Row>
        <Container>
          <Feed />
        </Container>
      </Row>
    </Container>
  );
}
