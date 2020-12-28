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
  };

  render() {
    const profileUsername = this.context.profile.usernameContext;
    return (
      <Navbar>
        <Navbar.Brand href="#home">Password Hash Test!</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {profileUsername ? profileUsername : "Please sign in!"}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
Nav.contextType = UsernameContext;
