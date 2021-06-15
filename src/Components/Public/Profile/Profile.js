import React, { useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import "./Profile.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileFeed from "../Profile/ProfileFeed/ProfileFeed";

export default function Profile() {
  const [profileTab, setProfileTab] = useState(<ProfileFeed />);

  const profileToFeed = () => {
    setProfileTab(<ProfileFeed />);
  };

  return (
    <Container className="profileCont">
      <Container className="prfNameCont">
        <Row>
          <Col xs="auto" className="backArrow">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="backArrow"
              color="white"
            />
          </Col>
          <Col className="prfUsername">
            <p className="prfUsername">Username</p>
          </Col>
        </Row>
      </Container>
      <Container className="prfHeroImageCont">
        <Row>
          <Col className="imgPlaceholderCont" />
        </Row>
      </Container>
      <Container className="prfPicCont">
        <Row>
          <Col xs="auto" className="prfImgPlc" />
          <Col>
            <Button id="editPrfBtn" variant="outline-primary">
              Edit profile
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="prfUsrInfoCont">
        <Row className="prfUsernameCont">
          <Col className="prfUsername">Username</Col>
          <Col className="prfAtUsername">@username</Col>
        </Row>
        <Row className="prfBioCont">
          <Col className="prfBio">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            tincidunt nisl et metus mattis porttitor. Nulla nec bibendum magna.
            Praesent sagittis placerat.
          </Col>
        </Row>
        <Row>
          <Col>joined?</Col>
        </Row>
        <Row className="presenceCont">
          <Col className="followCount">
            <Col className="followNum">256</Col>
            <Col className="presenceText">Following</Col>
          </Col>
          <Col className="followCount">
            <Col className="followingNum">225</Col>
            <Col className="presenceText">Followers</Col>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="profileNavBtns">
          <Col className="profileNavBtn">Tweets</Col>
          <Col className="profileNavBtn">Tweets and replies</Col>
          <Col className="profileNavBtn">Media</Col>
          <Col className="profileNavBtn">Likes</Col>
        </Row>
      </Container>
      <Row>{profileTab}</Row>
    </Container>
  );
}
