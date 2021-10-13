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
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationButton from "../LoginForm/AuthenticationButton";

export default function Dashboard() {
  const userContext = useContext(UsernameContext);
  const profileUsername = userContext.profile.usernameContext;
  const existing = localStorage.getItem("userContextID");
  const [navComp, setNavComp] = useState(<Feed />);
  const [LSID, setLSID] = useState("");
  const { user, isAuthenticated } = useAuth0();
  const [auth0Email, setAuth0Email] = useState("");
  const [auth0Username, setAuth0Username] = useState("");
  const [auth0GivenName, setAuth0GivenName] = useState("");
  const [auth0Nickname, setAuth0Nickname] = useState("");

  const LoStGet = localStorage.getItem("userContextID");

  if (isAuthenticated) {
    console.log(user);
    console.log("authEmail:", auth0Email);
    console.log("authUsername:", auth0Username);
    console.log("authGivenName:", auth0GivenName);
    console.log("authNick:", auth0Nickname);
    console.log("Authenticated?: ", isAuthenticated);
    axios
      .post("/api/user/auth0Login", {
        email: auth0Email,
      })
      .then((res) => {
        console.log("Dashboard res for auth0email", res.data);
      })
      .catch((err) => {
        console.log("err.response", err.response);
        console.log("err.response.status", err.response.status);
        console.log("err.response.headers", err.response.headers);
      });
  }

  useEffect(() => {
    setAuth0Email(user.email);
    setAuth0GivenName(user.given_name);
    setAuth0Nickname(user.nickname);
    setAuth0Username(user.name);
    // console.log("userDashboard", user);
    // checkLogin();
    checkLocal();
  }, []);

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
  };

  // const checkLogin = () => {
  //   console.log("check isAuthenticated from checkLogin", isAuthenticated);
  //   console.log("check auth0email from checkLogin", auth0Email);
  //   if (isAuthenticated === true) {
  //     axios.post("/api/user/auth0Login", {
  //       email: auth0Email,
  //     });
  //   }
  // };

  // const getUserInfo = () => {
  //   const { user, isAuthenticated } = useAuth0;
  //   // setUserInfo(user);
  //   // console.log(userInfo);
  //   console.log("dashboardUser", user);
  //   console.log("dasbhaordAuthenticated?", isAuthenticated);
  // };

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
                  <AuthenticationButton />
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
