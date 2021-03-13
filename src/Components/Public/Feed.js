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
  const [feedUsername, setFeedUsername] = useState();

  // "profileID" doesn't doesn't already have a profileID on first render.

  const getFeedData = () => {
    // console.log("usernameContext:", usernameContext);
    if (profileID === undefined) {
      return console.log("loading...................");
    } else {
      axios
        .get(`/api/user/${profileID}`)
        .then((res) => {
          console.log("res.data.posts", res.data.posts);
          setUserId(res.data._id);
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

  const usernameClick = () => {
    console.log("Username clicked");
    console.log("feedUsername", feedUsername);
    axios
      .get(`/api/user/${feedUsername}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ListGroup>
      {userStatus
        ? feed.reverse().map((feed) => (
            <ListGroupItem key={feed}>
              <Row>
                <Col>
                  <h6
                    onMouseEnter={() => {
                      setFeedUsername(feed.postAuthor_id);
                    }}
                    onMouseLeave={() => {
                      setFeedUsername("");
                    }}
                    onClick={() => {
                      setFeedUsername(feed.postAuthor_id);
                      console.log(feed.author);
                      usernameClick();
                    }}
                    value={feed.postAuthor_id}
                  >
                    {feed.author}
                  </h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>{feed.post}</h5>
                </Col>
              </Row>
              <Row>
                <Col></Col>
                <Col>ST</Col>
                <Col>RT</Col>
                <Col>LK</Col>
                <Col></Col>
              </Row>
            </ListGroupItem>
          ))
        : "loading"}
    </ListGroup>
  );
}
