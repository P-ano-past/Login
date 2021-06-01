import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import { UsernameContext } from "../../../../Utils/UsernameContext/UsernameContext";
import "./ProfileFeed.css";
import {
  faRetweet,
  faShare,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "react-avatar";

export default function ProfileFeed() {
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
    <Container className="feedMain">
      <Container>
        <ListGroup>
          {userStatus
            ? feed.reverse().map((feed) => (
                <ListGroupItem key={feed} className="feedText">
                  <Container id="statusContainer">
                    <Row>
                      <Col md="auto" className="avaCont">
                        <Avatar
                          className="feedAva"
                          name={feed.author}
                          size="50px"
                        />
                        {/* need image here */}
                      </Col>
                      <Col id="feedUserCont">
                        <Col id="feedUserIconBtnCont">
                          <Col id="usernameFeedCont">
                            <h6
                              className="usernameFeed"
                              onMouseEnter={() => {
                                setFeedUsername(feed.postAuthor_id);
                              }}
                              onMouseLeave={() => {
                                setFeedUsername("");
                              }}
                              onClick={() => {
                                setFeedUsername(feed.postAuthor_id);
                                usernameClick();
                              }}
                              value={feed.postAuthor_id}
                            >
                              @{feed.author}
                            </h6>
                          </Col>
                          <Col md="auto" id="optionsBtnCont">
                            <Button
                              id="feedMoreIC"
                              onClick={() => {
                                console.log("options clicked.");
                              }}
                            >
                              <FontAwesomeIcon icon={faEllipsisH} />
                            </Button>
                          </Col>
                        </Col>
                        <Col id="feedStatus">
                          <p>{feed.post}</p>
                        </Col>
                      </Col>
                    </Row>

                    <Container>
                      <Row className="userIntBtns">
                        <Row>
                          <Col>
                            <Col className="iconCont">
                              <FontAwesomeIcon
                                className="postIcon"
                                icon={faComment}
                                // size="1x"
                              />
                            </Col>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Col className="iconCont">
                              <FontAwesomeIcon
                                className="postIcon"
                                icon={faRetweet}
                                // size="1x"
                              />
                            </Col>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Col className="iconCont">
                              <FontAwesomeIcon
                                className="postIcon"
                                icon={faHeart}
                                // size="1x"
                              />
                            </Col>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Col className="iconCont">
                              <FontAwesomeIcon
                                className="postIcon"
                                icon={faShare}
                                // size="1x"
                              />
                            </Col>
                          </Col>
                        </Row>
                      </Row>
                    </Container>
                  </Container>
                </ListGroupItem>
              ))
            : "loading"}
        </ListGroup>
      </Container>
    </Container>
  );
}
