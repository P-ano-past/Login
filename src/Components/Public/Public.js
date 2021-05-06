import React, { useContext, useState, useEffect } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import { Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";

export default function Public() {
  const userContext = useContext(UsernameContext);
  const profileUsername = userContext.profile.usernameContext;

  const [foundUser, setFoundUser] = useState("");
  const [foundUserPosts, setFoundUserPosts] = useState("");

  const getWindowLocation = () => {
    axios.get(`/api/public${window.location.pathname}`).then((res) => {
      console.log(res.data[0]);
      setFoundUser(res.data[0].username);
      setFoundUserPosts(res.data[0].posts);
    });
  };

  useEffect(() => {
    getWindowLocation();
  }, [foundUser]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>{foundUser}</h1>
          <Button
            onClick={() => {
              console.log("finding user");
              getWindowLocation();
            }}
            placeholder="button that does something"
          >
            this is a BUTTON
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
