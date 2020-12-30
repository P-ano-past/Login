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

  signOutHandler() {}

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
              <div>
                {profileUsername}
                <Button onClick={this.signOutHandler}>Sign out</Button>
              </div>
            ) : (
              <div>
                <NavLink to="/signin">Sign in</NavLink> or
                <NavLink to="/register"> Register</NavLink>
              </div>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
Navigation.contextType = UsernameContext;
