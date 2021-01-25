import React, { useContext } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import { Container, Button, Col, Row } from "react-bootstrap";

export default function FriendSendRequest() {
  const userContext = useContext(UsernameContext);
  const profileID = userContext.profile._id;

  return <Button></Button>;
}
