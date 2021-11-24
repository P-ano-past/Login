import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Dropdown,
  DropdownProps,
} from "react-bootstrap";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import "./Feed.css";
import {
  faRetweet,
  faShare,
  faEllipsisH,
  faMeteor,
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "react-avatar";
import NewPost from "../Dashboard/NewPost/NewPost";

export default function Feed() {
  const usernameContext = useContext(UsernameContext);
  const profileID = usernameContext.profile._id;
  const userStatus = usernameContext.profile.email;
  const [feed, setFeed] = useState([]);
  const [userId, setUserId] = useState();
  const [feedUsername, setFeedUsername] = useState();
  const [delAuthor, setDelAuthor] = useState();

  // "profileID" doesn't doesn't already have a profileID on first render.

  const getFeedData = () => {
    // console.log("usernameContext:", usernameContext);
    if (profileID === undefined) {
      return console.log("loading...................");
    } else {
      axios
        .get(`/api/user/${profileID}`)
        .then((res) => {
          setUserId(res.data._id);
          setFeed(res.data.posts.reverse());
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
      <Col id="contentContainer">
        <Row>
          <Container>
            <Col id="category">
              Latest
              <Button className="latestSortIcon" variant="outline-dark, dark">
                <FontAwesomeIcon
                  icon={faMeteor}
                  id="latestSortBtn"
                  onClick={() => {
                    console.log("Meteor clicked.");
                  }}
                />
              </Button>
            </Col>
          </Container>
        </Row>
        <Container id="postCards">
          <Row>
            <NewPost />
            <Col className="divider" />
          </Row>
        </Container>
      </Col>

      <Container className="statusFeedContainer">
        <ListGroup>
          {userStatus
            ? feed.map((feed) => (
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
                            <Dropdown>
                              <Dropdown.Toggle id="dropdown-autoclose-true">
                                <FontAwesomeIcon icon={faEllipsisH} />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  href="#"
                                  onClick={() => {
                                    axios
                                      .delete(
                                        `/api/user/post/${feed.postAuthor_id}`,
                                        {
                                          data: {
                                            posts: {
                                              _id: feed._id,
                                              post: feed.post,
                                              postAuthor_id: feed.postAuthor_id,
                                            },
                                          },
                                        }
                                      )
                                      .then(() => {
                                        getFeedData();
                                      })
                                      .catch((err) => {
                                        console.log("err", err);
                                      });
                                  }}
                                >
                                  Delete?
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
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
