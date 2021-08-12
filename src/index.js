import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import { createBrowserHistory } from "history";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

// const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-54jms0nd.us.auth0.com"
      clientId="2SRs8ky7KiJS9SzbH9CdU7IYAZrig7ED"
      redirectUri={window.location.origin}
    >
      <Router
      // history={history}
      >
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// export default createBrowserHistory();
