import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import NewPost from "./NewPost/NewPost";
import Feed from "../Public/Feed";
import Avatar from "react-avatar";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect, useHistory, Link } from "react-router-dom";
import {
  faMeteor,
  faHome,
  faHashtag,
  faBell,
  faEnvelope,
  faBookmark,
  faStream,
  faUserAlt,
  faEllipsisH,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
// import Sidenav from "../Sidenav/Sidenav";
import Profile from "../Public/Profile/Profile";

export default function Dashboard() {
  const userContext = useContext(UsernameContext);
  const profileUsername = userContext.profile.usernameContext;
  const [navComp, setNavComp] = useState(<Feed />);

  const toFeed = () => {
    setNavComp(<Feed />);
  };

  const toProfile = () => {
    setNavComp(<Profile />);
  };
  return (
    <Container>
      <Container className="sideNavCont">
        <Row>
          <Container className="sidenavContainer">
            <Row xs="auto" className="sidenavItem">
              <Col className="testLine">
                <Col xs={3} className="navIconCont">
                  <FontAwesomeIcon
                    className="heroIcon"
                    icon={faAngleUp}
                    color="white"
                  />
                </Col>
              </Col>
            </Row>
          </Container>
          {/*  */}
          <Container className="sidenavContainer">
            <Row xs="auto" className="sidenavItem">
              <Link>
                <Col
                  className="testLine"
                  onClick={() => {
                    toFeed();
                  }}
                >
                  <Col xs={3} className="navIconCont">
                    <FontAwesomeIcon
                      className="faIcon"
                      icon={faHome}
                      color="white"
                    />
                  </Col>
                  <Col xs="auto" className="testLineText">
                    <span className="navTagItem">Home</span>
                  </Col>
                </Col>
              </Link>
            </Row>
          </Container>
          {/*  */}
          <Container className="sidenavContainer">
            <Row xs="auto" className="sidenavItem">
              <Col className="testLine">
                <Col xs={3} className="navIconCont">
                  <FontAwesomeIcon
                    className="faIcon"
                    icon={faHashtag}
                    color="white"
                  />
                </Col>
                <Col xs="auto" className="testLineText">
                  <span className="navTagItem">Explore</span>
                </Col>
              </Col>
            </Row>
          </Container>
          {/*  */}
          <Container className="sidenavContainer">
            <Row xs="auto" className="sidenavItem">
              <Col className="testLine">
                <Col xs={3} className="navIconCont">
                  <FontAwesomeIcon
                    className="faIcon"
                    icon={faBell}
                    color="white"
                  />
                </Col>
                <Col xs="auto" className="testLineText">
                  <span className="navTagItem">Notifications</span>
                </Col>
              </Col>
            </Row>
          </Container>
          {/*  */}
          <Container className="sidenavContainer">
            <Row xs="auto" className="sidenavItem">
              <Col className="testLine">
                {" "}
                <Col xs={3} className="navIconCont">
                  <FontAwesomeIcon
                    className="faIcon"
                    icon={faEnvelope}
                    color="white"
                  />
                </Col>
                <Col xs="auto" className="testLineText">
                  <span className="navTagItem">Messages</span>
                </Col>
              </Col>
            </Row>
          </Container>
          {/*  */}
          <Container className="sidenavContainer">
            <Row xs="auto" className="sidenavItem">
              <Col className="testLine">
                <Col xs={3} className="navIconCont">
                  <FontAwesomeIcon
                    className="faIcon"
                    icon={faBookmark}
                    color="white"
                  />
                </Col>
                <Col xs="auto" className="testLineText">
                  <span className="navTagItem">Bookmarks</span>
                </Col>
              </Col>
            </Row>
          </Container>
          {/*  */}
          <Container className="sidenavContainer">
            <Row xs="auto" className="sidenavItem">
              <Col className="testLine">
                <Col xs={3} className="navIconCont">
                  <FontAwesomeIcon
                    className="faIcon"
                    icon={faStream}
                    color="white"
                  />
                </Col>
                <Col xs="auto" className="testLineText">
                  <span className="navTagItem">Lists</span>
                </Col>
              </Col>
            </Row>
          </Container>
          {/*  */}
          <Container className="sidenavContainer">
            <Row xs="auto" className="sidenavItem">
              <Link>
                <Col
                  className="testLine"
                  onClick={() => {
                    toProfile();
                  }}
                >
                  <Col xs={3} className="navIconCont">
                    <FontAwesomeIcon
                      className="faIcon"
                      icon={faUserAlt}
                      color="white"
                    />
                  </Col>
                  <Col xs="auto" className="testLineText">
                    <span className="navTagItem">Profile</span>
                  </Col>
                </Col>
              </Link>
            </Row>
          </Container>
          {/*  */}
          <Container className="sidenavContainer">
            <Row xs="auto" className="sidenavItem">
              <Col className="testLine">
                <Col xs={3} className="navIconCont">
                  <FontAwesomeIcon
                    className="faIcon"
                    icon={faEllipsisH}
                    color="white"
                  />
                </Col>
                <Col xs="auto" className="testLineText">
                  <span className="navTagItem">More</span>
                </Col>
              </Col>
            </Row>
          </Container>
          {/*  */}
          <Container className="sidenavContainer">
            <Row>
              <Col>
                <Button id="postButton" size="lg" block>
                  Post
                </Button>
              </Col>
            </Row>
          </Container>

          <Container className="sidenavContainer">
            <Row id="UserNameDisplay">
              <Col className="userInfoCont">
                <Col md="auto" className="avatarCont">
                  <Avatar
                    name={profileUsername}
                    className="avatarIcon"
                    size="50px"
                  />
                </Col>
                <Col className="usernameCont">
                  <h3 id="displayNavUsername">
                    {profileUsername ? <p>@{profileUsername}</p> : ""}
                  </h3>
                </Col>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      <Row>
        <Col xs={3}></Col>
        <Col>
          {/*   I NEED A SWITCH HERE SO I CAN RENDER DIFFERENT COMPONENTS */}
          {navComp}
          {/* <Feed /> */}
          {/* <Profile /> */}
        </Col>
      </Row>
    </Container>
  );
}

//auth0 React Authentication
