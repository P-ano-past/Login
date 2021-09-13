import React from "react";
import LoginButton from "./LoginBtn/Auth0Login";
import LogoutButton from "./LogoutBtn/Auth0LogoutBtn";
import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;
