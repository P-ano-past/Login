import React, { Component } from "react";
import "./App.css";
import LoginForm from "./Components/LoginForm/LoginForm";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import { UsernameContext } from "./Components/UsernameContext/UsernameContext";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      setProfile: this.setProfile,
    };
  }

  setProfile = (profile) => {
    this.setState({ profile });
  };

  render() {
    return (
      <div className="App">
        <UsernameContext.Provider value={this.state}>
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/Dashboard" exact component={Dashboard} />
          </Switch>
        </UsernameContext.Provider>
      </div>
    );
  }
}
