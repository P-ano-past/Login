import React, { Component } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import { Navbar, Button } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";

export default class Navigation extends Component {
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
        <Navbar.Brand href="/">Password Hash Test!</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <NavLink to="/">Home</NavLink>|<NavLink to="/about">About</NavLink>|
          <Navbar.Text>
            {profileUsername ? (
              profileUsername
            ) : (
              <NavLink to="/signin">Sign in</NavLink>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
Navigation.contextType = UsernameContext;
