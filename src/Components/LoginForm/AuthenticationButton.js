import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import LoginButton from "./LoginBtn/Auth0Login";
import LogoutButton from "./LogoutBtn/Auth0LogoutBtn";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";

export default function AuthenticationButton() {
  const history = useHistory();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const context = useContext(UsernameContext);

  useEffect(() => {
    const doSomething = async () => {
      console.log("isAuth?", isAuthenticated);
      axios
        .post("/api/user/auth0Login", {
          username: user.name,
          email: user.email,
          given_name: user.given_name,
          nickname: user.given_name,
        })
        .then((res) => {
          context.setProfile({
            _id: res.data[0]._id,
            username: res.data[0].username,
            email: res.data[0].email,
            nickname: res.data[0].nickname,
          });
          history.push("/Dashboard");
        })
        .catch((err) => {
          console.log("err.response", err.response);
          console.log("err.response.status", err.response.status);
          console.log("err.response.headers", err.response.headers);
        });
    };
    if (!isLoading) {
      doSomething();
    }
  }, [isLoading]);

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
}
