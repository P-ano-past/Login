import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import Feed from "../Public/Feed";
import Avatar from "react-avatar";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
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
import Profile from "../Public/Profile/Profile";
import "../../Components/Sidenav/Sidenav.css";
import axios from "axios";

export default function Dashboard() {
  const userContext = useContext(UsernameContext);
  const profileUsername = userContext.profile.usernameContext;
  const existing = localStorage.getItem("userContextID");
  const [navComp, setNavComp] = useState(<Feed />);
  const [LSID, setLSID] = useState("");

  const LoStGet = localStorage.getItem("userContextID");

  useEffect(() => {
    checkLocal();
  }, [userContext]);

  const checkLocal = () => {
    console.log("userContext", userContext);
    setLSID(localStorage.getItem("userContextID"));
    // console.log("userContext", userContext);
    // console.log("window.performance", window.performance);
    if (window.performance.navigation.type === 0) {
      console.log("window loaded. ");
      localStorage.setItem("userContextID", userContext.profile._id);
    } else if (window.performance.navigation.type === 1) {
      console.log("userContext refresh", userContext);
      setLSID(LoStGet);
      axios.get(`/api/user/${LoStGet}`).then((res) => {
        console.log(`res call from window refresh`, res.data);
      });
    }

    if (LSID) {
      // context.setProfile({ _id: LSID });

      console.log("LSID: ", LSID);
    } else {
      console.log("nothing here");
    }
  };

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
