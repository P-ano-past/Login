import React, { useContext } from "react";
import { usernameContext } from "../usernameContext/usernameContext";

export default function Dashboard(props) {
  const username = useContext(usernameContext);
  return (
    <div>
      <h1>{username}</h1>
    </div>
  );
}
