import React from "react";
import "./App.css";
import LoginForm from "./Components/LoginForm/LoginForm";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import { UsernameContext } from "./Utils/UsernameContext/UsernameContext";
import Navigation from "./Components/Navbar/Nav";
import Landing from "./Components/Landing/Landing";

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
          <Navigation component={Navigation} />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/signin" exact component={LoginForm} />
            <Route path="/about" exact component={Landing} />

            <Route path="/Dashboard" exact component={Dashboard} />
          </Switch>
        </UsernameContext.Provider>
      </div>
    );
  }
}
