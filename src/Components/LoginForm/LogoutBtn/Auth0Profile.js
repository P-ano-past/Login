import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { UsernameContext } from "../../../Utils/UsernameContext/UsernameContext";
import "./style.css";

export default function Auth0Profile() {
  const userInfoContext = useContext(UsernameContext);
  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log("UserContext from Authprofile", userInfoContext);

  if (isLoading) {
    return <div>Loading...</div>;
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
}
