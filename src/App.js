import React from "react";
import "./App.css";
import RegistrationForm from "./Components/LoginForm/RegistrationForm";
import SignInForm from "./Components/LoginForm/SignInForm";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import { UsernameContext } from "./Utils/UsernameContext/UsernameContext";
import Navigation from "./Components/Navbar/Navigation";
import Landing from "./Components/Landing/Landing";
import CreatePost from "./Components/Create/CreatePost/CreatePost";
import Settings from "./Components/Settings/Settings";
import Public from "./Components/Public/Public";

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
            <Route path="/register" exact component={RegistrationForm} />
            <Route path="/signIn" exact component={SignInForm} />
            <Route path="/about" exact component={Landing} />
            <Route path="/Dashboard" exact component={Dashboard} />
            <Route path="/CreatePost" exact component={CreatePost} />
            <Route path="/Settings" exact component={Settings} />
            <Route path="/Public" exact component={Public} />
          </Switch>
        </UsernameContext.Provider>
      </div>
    );
  }
}
