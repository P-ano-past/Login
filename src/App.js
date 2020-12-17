import React, { Component } from "react";
import "./App.css";
import LoginForm from "./Components/LoginForm/LoginForm";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
// import { usernameContext } from "./Components/usernameContext/usernameContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  render() {
    return (
      <div className="App">
        {/* <usernameContext.Provider value={this.state.user}> */}
        {/* <LoginForm /> */}
        This is the app
        <Switch>
          <Route path="/" exact component={LoginForm} />
          <Route path="/Dashboard" exact component={Dashboard} />
        </Switch>
        {/* </usernameContext.Provider> */}
      </div>
    );
  }
}

export default App;
