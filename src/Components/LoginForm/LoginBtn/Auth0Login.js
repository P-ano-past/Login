import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      id="AuthLoginBtn"
      variant="outline-primary"
      onClick={() => loginWithRedirect()}
    >
      Log In test
    </Button>
  );
};

export default LoginButton;
