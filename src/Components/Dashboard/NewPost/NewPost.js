import React, { useState, useContext } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import { UsernameContext } from "../../../Utils/UsernameContext/UsernameContext";

export default function NewPost() {
  const userContext = useContext(UsernameContext);

  console.log(userContext);
  const [newUserPost, setNewUserPost] = useState("");
  const [postAuthor, setPostAuthor] = useState("");

  const handleSubmit = () => {
    console.log(postAuthor);
    console.log(newUserPost);
    // axios.post("/api/user/post", {});
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form noValidate>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className="newUserPost"
                placeholder="Whats going on?"
                aria-label="newUserPost"
                name="newUserPost"
                value={newUserPost}
                onChange={(e) => setNewUserPost(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button onClick={handleSubmit}> Submit!</Button>
        </Col>
      </Row>
    </Container>
  );
}
