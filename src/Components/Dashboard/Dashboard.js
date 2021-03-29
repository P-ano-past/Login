import { Container, Row, Col } from "react-bootstrap";
import React, { useContext } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import { useHistory } from "react-router-dom";
import NewPost from "./NewPost/NewPost";
import Feed from "../Public/Feed";
import "./Dashboard.css";

import Sidenav from "../Sidenav/Sidenav";

export default function Dashboard() {
  const userContext = useContext(UsernameContext);

  const history = useHistory();
  console.log(history);

  // console.log(userContext);

  const profileUsername = userContext.profile.usernameContext;

  return (
    <Container>
      <Row>
        <Col xs={3}>
          <Sidenav />
        </Col>
        <Col id="contentContainer">
          <Col id="category">Latest</Col>
          <NewPost />
          <Col className="divider" />
          <Feed />
        </Col>
      </Row>
    </Container>
  );
}

//auth0 React Authentication
