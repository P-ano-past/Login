import {
  Col,
  Row,
  Container,
  InputGroup,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userPassword: "",
      errors: {
        username: "",
        userPassword: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "username":
        errors.username =
          value.length < 3 || ""
            ? "Username must be at least 3 characters long!"
            : "";
        break;
      case "userPassword":
        errors.userPassword =
          value.length < 3 || ""
            ? "Password must be at least 3 characters long!"
            : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm(this.state.errors)) {
      axios
        .post("/api/user", {
          username: this.state.username.replace(/\s+/g, ""),
          userPassword: this.state.userPassword.replace(/\s+/g, ""),
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.code);
          console.log(err.message);
          console.log(err.stack);
        });

      this.setState({
        username: "",
        userPassword: "",
      });
    } else {
      console.error("Invalid Form");
      this.handleShow();
    }
  };

  handleReset = (event) => {
    event.preventDefault();
  };

  render() {
    const { errors } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit} noValidate>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  className="userInput"
                  placeholder="Username"
                  aria-label="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  aria-describedby="basic-addon1"
                  type="text"
                  autoComplete="username"
                  noValidate
                />
                {errors.username.length > 0 && (
                  <span className="error">{errors.username}</span>
                )}
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  className="userInput"
                  placeholder="Password"
                  aria-label="Password"
                  name="userPassword"
                  value={this.state.userPassword}
                  onChange={this.handleChange}
                  aria-describedby="basic-addon1"
                  type="password"
                  autoComplete="password"
                  noValidate
                />
                {errors.userPassword.length > 0 && (
                  <span className="error">{errors.userPassword}</span>
                )}
              </InputGroup>
            </Form>
            <Button type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
            <Button>Reset</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
