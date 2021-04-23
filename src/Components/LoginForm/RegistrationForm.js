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
import { Redirect } from "react-router-dom";
import axios from "axios";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

export default class RegistrationForm extends Component {
  static contextType = UsernameContext;

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userPassword: "",
      redirect: null,
      isLoggedIn: "",
      _id: "",
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
          if (res.status === 200) {
            // console.log("res from reg post ", res);
            this.setState({
              redirect: "/Dashboard",
              isLoggedIn: true,
              _id: res.data._id,
              //async state change
            });
          } else {
            console.log("the status is NOT 200, its: " + res.status);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(err.message);
          console.log(err.stack);
        })
        .then(() => {
          const context = this.context;
          context.setProfile({
            usernameContext: this.state.username,
            isLoggedInContext: this.state.isLoggedIn,
            _id: this.state._id,
          });

          // this._initProfile();
          // console.log("this.state after 200 handleSubmit", this.state);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.message);
          console.log(err.stack);
        });
    } else {
      console.error("Invalid Form");
      this.handleShow();
    }
    // this._initPrfofile();
  };

  handleReset = (event) => {
    event.preventDefault();
  };

  render() {
    const { errors } = this.state;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <Container>
        <UsernameContext.Provider value={this.state}>
          <Row>
            <Col>
              Create your account
              <Form onSubmit={this.handleSubmit} noValidate>
                <InputGroup className="mb-3">
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
        </UsernameContext.Provider>
      </Container>
    );
  }
}
