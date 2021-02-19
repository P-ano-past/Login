import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";

export default function Feed() {
  const usernameContext = useContext(UsernameContext);
  const profileID = usernameContext.profile._id;
  const userStatus = usernameContext.profile.isLoggedInContext;

  const [feed, setFeed] = useState([]);
  const [userId, setUserId] = useState();

  // "profileID" doesn't doesn't already have a profileID on first render.

  const getFeedData = () => {
    if (profileID === undefined) {
      return console.log("loading...................");
    } else {
      axios
        .get(`/api/user/${profileID}`)
        .then((res) => {
          setFeed(res.data.posts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getFeedData();
  }, [profileID]);

  return (
    <Container>
      <Row>
        <ListGroup>
          {userStatus
            ? feed.map((feed) => (
                <ListGroupItem>
                  <Row>
                    <Col>{feed.post}</Col>
                  </Row>
                </ListGroupItem>
              ))
            : "loading"}
        </ListGroup>
      </Row>
    </Container>
  );
}
