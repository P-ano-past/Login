import { Button, Container } from "react-bootstrap";
import React, { Component } from "react";
import { UsernameContext } from "../UsernameContext/UsernameContext";
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
  };

  homeClick = () => {
    this.setState({
      redirect: "/",
    });
  };

  render() {
    const { profile } = this.state;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Container>
        <h3>Welcome, {profile.usernameContext}!</h3>
      </Container>
    );
  }
}
Dashboard.contextType = UsernameContext;
