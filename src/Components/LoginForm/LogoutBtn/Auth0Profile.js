import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css";

const Auth0Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const history = useHistory();

  if (isAuthenticated === true) {
    history.push("/Dashboard");
    console.log("isloggedin && user: ", user);
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
