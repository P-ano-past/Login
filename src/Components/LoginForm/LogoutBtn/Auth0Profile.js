import React, { useContext, useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { UsernameContext } from "../../../Utils/UsernameContext/UsernameContext";
import "./style.css";
import axios from "axios";

const Auth0Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [auth0Email, setAuth0Email] = useState("");
  const [auth0Username, setAuth0Username] = useState("");
  const [auth0GivenName, setAuth0GivenName] = useState("");
  const [auth0Nickname, setAuth0Nickname] = useState("");

  const history = useHistory();
  const userInfoContext = useContext(UsernameContext);

  // console.log("UserContext from Authprofile", userInfoContext);

  if (isAuthenticated === true) {
    history.push("/Dashboard");
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Auth0Profile;
