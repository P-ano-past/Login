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
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import { UsernameContext } from "../UsernameContext/UsernameContext";

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

export default class LoginForm extends Component {
  static contextType = UsernameContext;

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isLoggedIn: null,
      res: Number,
      userPassword: "",
      redirect: null,
      errors: {
        username: "",
        userPassword: "",
      },
    };
  }

  _initProfile() {
    const context = this.context;
    //modify the set profile to add information to the "profile" object for the usernameContext.
    console.log("_initProfile this.state.isloggedin", this.state.isLoggedIn);
    context.setProfile({
      usernameContext: this.state.username,
      isLoggedInContext: this.state.isLoggedIn,
    });
  }

  componentDidMount() {
    this._initProfile();
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
            // console.log("this.state", this.state);
            this.setState({
              redirect: "/Dashboard",
              isLoggedIn: true,
            });
          } else {
            console.log("the status is NOT 200, its: " + res.status);
          }
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
    this._initProfile();
    console.log("login form this.state", this.state);
  };

  handleReset = (event) => {
    event.preventDefault();
  };

  render() {
    // let props = this.props;
    // let loggedInUser = this.context;
    const { errors } = this.state;
    if (this.state.redirect) {
      return (
        <Redirect
          to={this.state.redirect}
          // onChange={(e) => this.setState({ isLoggedIn: true })}
        />
      );
    }

    return (
      <Container>
        <UsernameContext.Provider value={this.state}>
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit} noValidate>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      Username
                    </InputGroup.Text>
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
                    <InputGroup.Text id="basic-addon1">
                      Password
                    </InputGroup.Text>
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
        </UsernameContext.Provider>
      </Container>
    );
  }
}
