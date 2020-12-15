import "./App.css";
import LoginForm from "./Components/LoginForm/LoginForm";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import { UserProvider } from "./Components/UserContext/UserContext";

function App() {
  const user = { name: "bloopie", loggedIn: true };

  return (
    <div className="App">
      <UserProvider value={user}>
        {/* <LoginForm /> */}
        This is the app
        <Switch>
          <Route path="/" exact component={LoginForm} />
          <Route path="/Dashbaord" exact component={Dashboard} />
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
