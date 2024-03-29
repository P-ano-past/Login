import React, { useState, useContext } from "react";
import { Col, Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import { UsernameContext } from "../../../Utils/UsernameContext/UsernameContext";
import "./NewPost.css";

export default function NewPost() {
  const userContext = useContext(UsernameContext);
  const usernamePost = userContext.profile.username;
  const profileID = userContext.profile._id;
  const [newUserPost, setNewUserPost] = useState("");
  const [postAuthorID, setPostAuthorID] = useState("");
  const [postAuthorName, setPostAuthorName] = useState("");

  const handleBoxClick = (e) => {
    setPostAuthorID(profileID);
    setPostAuthorName(usernamePost);
  };

  const handleSubmit = () => {
    window.location.reload(false);
    axios
      .post(`/api/user/post/${profileID}`, {
        posts: {
          post: newUserPost,
          author: postAuthorName,
          postAuthor_id: postAuthorID,
        },
      })
      .then((res) => {
        console.log("new post res", res);
      })
      .catch((err) => {
        console.log("err.response", err.response);
        console.log("err.response.status", err.response.status);
        console.log("err.response.headers", err.response.headers);
      })
      .then(() => {
        setNewUserPost("");
      });
  };

  return (
    <Container>
      <Col>
        <Form noValidate>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              id="textSpace"
              rows={3}
              className="newUserPost"
              placeholder="Whats going on??"
              aria-label="newUserPost"
              name="newUserPost"
              value={newUserPost}
              onClick={(e) => handleBoxClick()}
              onChange={(e) => setNewUserPost(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button id="sendBtn" onClick={handleSubmit}>
          Send



        </Button>
      </Col>
    </Container>
  );
}
