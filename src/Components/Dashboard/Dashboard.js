import { Button, Container } from "react-bootstrap";
import React, { Component } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import { Redirect } from "react-router-dom";

export default class Dashboard extends Component {
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

    this.setState({
      profile: context.profile,
    });

    console.log(this.state);
  };

  render() {
    const { profile } = this.state;

    console.log({ profile });
    console.log(profile);
    return (
      <Container>
        <h3>Welcome, {profile.usernameContext}!</h3>
        <h1>{this.context.isLoggedinContext}</h1>
      </Container>
    );
  }
}
Dashboard.contextType = UsernameContext;
