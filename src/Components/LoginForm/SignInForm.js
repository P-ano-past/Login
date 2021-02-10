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
      loginError: "",
      errors: {
        username: "",
        userPassword: "",
      },
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  _initProfile() {
    const context = this.context;
    //modify the set profile to add information to the "profile" object for the usernameContext.
    context.setProfile({
      usernameContext: this.state.username,
      isLoggedIn: true,
    });
  }

  componentDidMount() {
    this._initProfile();
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      userPassword: event.target.value,
    });
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
        .post("/api/user/login", {
          username: this.state.username.replace(/\s+/g, ""),
          userPassword: this.state.userPassword.replace(/\s+/g, ""),
        })
        .then((res) => {
          if (res.status === 200) {
            const context = this.context;
            // console.log("200 res", res);
            this.setState({
              redirect: "/Dashboard",
              isLoggedIn: true,
              _id: res.data._id,
            });
            console.log("this.state", this.state);
            context.setProfile({
              usernameContext: this.state.username,
              isLoggedInContext: this.state.isLoggedIn,
              _id: this.state._id,
            });
          }
          if (res.status === 401) {
            console.log("password is incorrect");
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("err.response.data", err.response.data);
          console.log("err.response.status", err.response.status);
          console.log("err.response.headers", err.response.headers);
          if (err.response.status === 401) {
            this.setState({ loginError: "Invalid username or password." });
            //this is where the error needs to be  displayed when it triggers.
          }
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <Container>
        <UsernameContext.Provider value={this.state}>
          <Row>
            <Col>
              Sign-In here:
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
                <p value={this.state.loginError}>{this.state.loginError}</p>
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
