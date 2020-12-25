import React from "react";
import "./App.css";
import LoginForm from "./Components/LoginForm/LoginForm";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import { UsernameContext } from "./Components/UsernameContext/UsernameContext";
import Nav from "./Components/Navbar/Nav";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: { username: String, isLoggedIn: "" },
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
          <Nav component={Nav} />
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/Dashboard" exact component={Dashboard} />
          </Switch>
        </UsernameContext.Provider>
      </div>
    );
  }
}
