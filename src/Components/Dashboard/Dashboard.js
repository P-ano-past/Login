import { Container, Row, Col, Button } from "react-bootstrap";
import React from "react";
import { Switch } from "react-router-dom";
import NewPost from "./NewPost/NewPost";
import Feed from "../Public/Feed";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeteor } from "@fortawesome/free-solid-svg-icons";
import Sidenav from "../Sidenav/Sidenav";

export default function Dashboard() {
  // const userContext = useContext(UsernameContext);
  // const history = useHistory();
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <Sidenav />
        </Col>
        <Col>
          <Feed />
        </Col>
      </Row>
    </Container>
  );
}

//auth0 React Authentication
