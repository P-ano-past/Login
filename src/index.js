import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import { createBrowserHistory } from "history";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

// const history = createBrowserHistory();
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// export default createBrowserHistory();
