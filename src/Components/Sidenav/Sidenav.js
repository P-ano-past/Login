import React, { useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidenav.css";

export default function Sidenav() {
  const userContext = useContext(UsernameContext);

  const profileUsername = userContext.profile.usernameContext;

  return (
    // <Container>
    <Row id="dashNav">
      <div id="heroContainer">
        <FontAwesomeIcon
          className="heroIcon"
          icon={faAngleUp}
          // size="1x"
          color="white"
        />
      </div>

      <div className="sidenavText">
        <FontAwesomeIcon
          className="faIcon"
          icon={faHome}
          // size="1x"
          color="white"
        />
        Home
      </div>
      <div className="sidenavText">
        <FontAwesomeIcon
          className="faIcon"
          icon={faHashtag}
          // size="1x"
          color="white"
        />
        Explore
      </div>
      <div className="sidenavText">
        <FontAwesomeIcon
          className="faIcon"
          icon={faBell}
          // size="1x"
          color="white"
        />
        Notifications
      </div>
      <div className="sidenavText">
        <FontAwesomeIcon
          className="faIcon"
          icon={faEnvelope}
          // size="1x"
          color="white"
        />
        Messages
      </div>
      <div className="sidenavText">
        <FontAwesomeIcon
          className="faIcon"
          icon={faBookmark}
          // size="1x"
          color="white"
        />
        Bookmarks
      </div>
      <div className="sidenavText">
        <FontAwesomeIcon
          className="faIcon"
          icon={faStream}
          // size="1x"
          color="white"
        />
        Lists
      </div>
      <div className="sidenavText">
        <FontAwesomeIcon
          className="faIcon"
          icon={faUserAlt}
          // size="1x"
          color="white"
        />
        Profile
      </div>
      <div className="sidenavText">
        <FontAwesomeIcon
          className="faIcon"
          icon={faEllipsisH}
          // size="1x"
          color="white"
        />
        More
      </div>
      <div>
        <Button>Post</Button>
      </div>
      <Col>
        <div className="sidenavText">
          <h3 id="displayUsername">
            {profileUsername ? <p>{profileUsername}</p> : ""}
          </h3>
        </div>
      </Col>
    </Row>
    // </Container>
  );
}
