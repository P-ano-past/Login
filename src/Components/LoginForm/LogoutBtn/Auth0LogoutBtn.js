import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      id="AuthLogoutBtn"
      variant="outline-primary"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
