import React, { Component } from "react";
import { UsernameContext } from "../UsernameContext/UsernameContext";
import { Navbar } from "react-bootstrap";

export default class Nav extends Component {
  static contextType = UsernameContext;

  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      profile: {},
    };
  }

  componentDidMount = () => {
    const context = this.context;
    this.setState(context);
    console.log("this.context from componentdidmount", this.context);
  };

  render() {
    const isLoggedIn = this.context.profile.isLoggedIn;
    const profileUsername = this.context.profile.username;
    console.log("this.context", this.context);
    console.log("this.context.profile", this.context.profile.username);

    return (
      <Navbar>
        <Navbar.Brand href="#home">Password Hash Test!</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {isLoggedIn ? profileUsername : "Please sign in!"}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
Nav.contextType = UsernameContext;
