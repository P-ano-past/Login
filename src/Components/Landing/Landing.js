import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  InputGroup,
  FormControl,
  Form,
  Modal,
} from "react-bootstrap";
import "./Landing.css";
import Footer from "../Footer/Footer";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { createBrowserHistory } from "history";

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

const history = createBrowserHistory();

export default class Landing extends Component {
  static contextType = UsernameContext;
  constructor(props) {
    super(props);
    this.state = {
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
    // let history = useHistory();
    console.log(history);
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
            history.push("/Dashboard");
            // console.log("200 res", res);
            this.setState({
              redirect: "/Dashboard",
              isLoggedIn: true,
              _id: res.data._id,
            });
            // console.log("this.state", this.state);
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

  render() {
    const { errors } = this.state;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <Container id="landingBg">
        <Row id="bgimagerow">
          <Col>
            <Image
              src="https://live.staticflickr.com/65535/50980086008_f443307bd5_k.jpg"
              width="1080"
              height="900"
              alt="magenta led panels"
              id="landingImg"
            />
          </Col>

          <Col xs={6} id="joinContainer">
            <Row className="loginContainer">
              <Col>
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
                </Form>
              </Col>

              <Col>
                <Form>
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

                    <p value={this.state.loginError}>{this.state.loginError}</p>
                  </InputGroup>
                </Form>
              </Col>

              <Col>
                <Button
                  id="submitButton"
                  type="submit"
                  onClick={this.handleSubmit}
                  variant="outline-primary"
                >
                  Log in
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <FontAwesomeIcon
                  icon={faAngleUp}
                  size="10x"
                  color="white"
                  id="heroLandingIcon"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="join">
                  <h1 id="happNow">Happening now</h1>
                  <h4 id="joinN">Join nSpace today.</h4>
                </p>
              </Col>
            </Row>

            <Row>
              <Col>
                <Button
                  className="joinbtns"
                  id="signupbtn"
                  onClick={() => {
                    console.log("signup clicked");
                  }}
                  size="lg"
                  block
                >
                  Sign up
                </Button>
              </Col>
              <Col></Col>
            </Row>
            {/* <Row>
              <Col>
                <Button
                  className="joinbtns"
                  id="loginbtn"
                  onClick={() => {
                    console.log("login clicked.");
                  }}
                  variant="outline-primary"
                  size="lg"
                  block
                >
                  Login
                </Button>
              </Col>
              <Col></Col>
            </Row> */}
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

// https://flic.kr/p/2kEWgs9 red led light panel wall
