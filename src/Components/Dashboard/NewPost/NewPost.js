import React, { useState, useContext } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import { UsernameContext } from "../../../Utils/UsernameContext/UsernameContext";

export default function NewPost() {
  const userContext = useContext(UsernameContext);
  const profileID = userContext.profile._id;
  const [newUserPost, setNewUserPost] = useState("");
  const [postAuthor, setPostAuthor] = useState("");

  const handleBoxClick = (e) => {
    setPostAuthor(profileID);
    console.log(userContext);
  };

  const handleSubmit = () => {
    // console.log(postAuthor);
    // console.log(newUserPost);
    axios
      .post(`/api/user/post/${profileID}`, {
        posts: { post: newUserPost, author: postAuthor },
      })
      .then((res) => {
        console.log("line 34 res", res);
      })

      .catch((err) => {
        console.log("err.response.data", err.response.data);
        console.log("err.response.status", err.response.status);
        console.log("err.response.headers", err.response.headers);
      });
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
                onClick={(e) => handleBoxClick()}
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
