import React, { Component } from "react";
import { Container, Button, InputGroup, FormControl } from "react-bootstrap";

export default class CreatePost extends Component {
  render() {
    return (
      <Container>
        <div>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <h5>New post:</h5>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as="textarea" aria-label="New post" />
          </InputGroup>
        </div>
        <Button>Submit</Button>
        <Button variant="danger">Cancel</Button>
      </Container>
    );
  }
}
