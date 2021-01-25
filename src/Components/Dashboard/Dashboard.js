import { Container } from "react-bootstrap";
import React, { useContext } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const userContext = useContext(UsernameContext);
  // const [passHash, setPassHash] = useState("");

  // console.log("funk", userContext);
  const profileUsername = userContext.profile.usernameContext;
  const profileID = userContext.profile._id;

  return (
    <Container>
      <h3>
        Welcome,
        {profileUsername ? <p>{profileUsername}</p> : ""}
      </h3>
    </Container>
  );
}
