import { Button } from "react-bootstrap";
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

  componentDidMount() {
    const context = this.context;
    console.log("context", context);
    this.setState({ profile: context.profile });
  }

  handleClick() {
    console.log(UsernameContext);
  }

  homeClick = () => {
    console.log(this.state);
    this.setState({
      redirect: "/",
    });
  };

  render() {
    const { profile } = this.state;
    console.log("dashboard profile", { profile });
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    // const { profile } = this.state;
    return (
      <div>
        <h3>Welcome, {profile.username}!</h3>
        <Button onClick={this.homeClick}>Home</Button>
      </div>
    );
  }
}
Dashboard.contextType = UsernameContext;
