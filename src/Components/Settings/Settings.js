import React, { useState, useContext } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";

export default function Settings() {
  const userContext = useContext(UsernameContext);
  const [username, setUsername] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const profileUsername = userContext.profile.usernameContext;
  // const profileID = userContext.profile._id;

  const handleSubmit = () => {
    if (newPassword1 === newPassword2) {
      console.log("passwords match!");
    } else {
      console.log("Passwords do not match. try again!!");
    }
  };

  return (
    <Container>
      <Form noValidate>
        {/* <Form onSubmit={handleSubmit()} noValidate> */}
        <InputGroup className="ms-3" size="sm">
          <InputGroup.Prepend>
            <InputGroup.Text>Change username:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            className="userInput"
            placeholder={profileUsername}
            aria-label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            noValidate
          />
        </InputGroup>
        <InputGroup className="ms-3" size="sm">
          <InputGroup.Prepend>
            <InputGroup.Text>Change password:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            className="userInput"
            placeholder="Enter new password."
            aria-label="New password1"
            name="new password1"
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
            type="text"
            noValidate
          />
          <FormControl
            className="userInput"
            placeholder="Retype new password."
            aria-label="New password2"
            name="new password2"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            type="text"
            noValidate
          />
        </InputGroup>
      </Form>
      <Button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </Button>
    </Container>
  );
}
