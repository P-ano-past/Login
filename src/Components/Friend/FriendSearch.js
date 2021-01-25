import React from "react";
import axios from "axios";

export default function FriendSearch() {
  const searchResults = () => {
    axios.get("/api/user").then((res) => {
      console.log(res);
    });
  };
  return <div></div>;
}
