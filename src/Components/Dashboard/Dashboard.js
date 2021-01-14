import { Button, Container, Form } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import { Redirect } from "react-router-dom";
import axios from "axios";
import CreatePost from "../Create/CreatePost/CreatePost";

export default function Dashboard() {
  const userContext = useContext(UsernameContext);
  // const [passHash, setPassHash] = useState("");

  // console.log("funk", userContext);
  const profileUsername = userContext.profile.usernameContext;
  const profileID = userContext.profile._id;

  // const getPassword = () => {
  //   axios.get(`api/user/${profileID}`).then((res) => {
  //     console.log("getPassword res", res);
  //     const retrivedPassHash = res.data.userPassword;
  //     setPassHash(retrivedPassHash);
  //   });
  // };

  return (
    <Container>
      <h3>
        Welcome,
        {profileUsername ? <p>{profileUsername}</p> : ""}
      </h3>

      {/* 
      {passHash ? (
        <p>
          <b>Your hashed password: </b>
          {passHash}
        </p>
      ) : (
        <Button
          onClick={() => {
            getPassword();
          }}
        >
          Get Password!
        </Button>
      )} */}
    </Container>
  );
}
