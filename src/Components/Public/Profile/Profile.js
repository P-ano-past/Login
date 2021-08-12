import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import "./Profile.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileFeed from "../Profile/ProfileFeed/ProfileFeed";
import { UsernameContext } from "../../../Utils/UsernameContext/UsernameContext";
import axios from "axios";

export default function Profile() {
  const usernameContext = useContext(UsernameContext);
  const profileID = usernameContext.profile._id;

  const [profileTab, setProfileTab] = useState(<ProfileFeed />);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [getName, setGetName] = useState();
  const [getBio, setGetBio] = useState();
  const [getHandle, setGetHandle] = useState("");

  const profileToFeed = () => {
    setProfileTab(<ProfileFeed />);
  };

  const getProfileInfo = () => {
    axios
      .get(`/api/user/${profileID}`)
      .then((res) => {
        console.log("res.data", res.data);
        setGetName(res.data.profile.customHandle);
        setGetBio(res.data.profile.bio);
        setGetHandle(res.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfileInfo();
  }, [profileID]);

  const launchModal = () => {
    setShow(true);
    setName(getName);
    setBio(getBio);
  };

  const nameHandleing = () => {
    console.log(`name: ${name}, getName: ${getName}`);
    setName(getName);
  };

  const bioHandling = () => {
    setBio(getBio);
  };

  const submit = () => {
    setShow(false);
    console.log(
      "name: ",
      name,
      "bio: ",
      bio,
      "profileID: ",
      profileID,
      "getName: ",
      getName,
      "getBio:",
      getBio,
      "getHandle:",
      getHandle
    );

    axios
      .post(`/api/user/profileUpdate/${profileID}`, {
        profile: {
          customHandle: name,
          bio: bio,
          author_id: profileID,
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log("err.response", err.response);
        console.log("err.response.status", err.response.status);
        console.log("err.response.headers", err.response.headers);
      })
      .then(() => {
        setName(name);
        setBio(getBio);
      });
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
            <Button
              id="editPrfBtn"
              variant="outline-primary"
              onClick={() => launchModal()}
            >
              Edit profile
            </Button>
            <Modal size="sm" show={show} ohHide={() => setShow(false)}>
              <Modal.Header>
                <Button onClick={() => setShow(false)}>X</Button>
                <Modal.Title id="example-modal-sizes-title-sm">
                  Edit profile
                </Modal.Title>
                <Button onClick={() => submit()}>Save</Button>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate>
                  <Form.Group controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={getName}
                      value={name}
                      onFocus={() => {
                        nameHandleing();
                      }}
                      // onClick={(e) => {}}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupBio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={getBio}
                      value={bio}
                      onFocus={(e) => {
                        bioHandling();
                      }}
                      onChange={(e) => {
                        setBio(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>
      <Container className="prfUsrInfoCont">
        <Row className="prfUsernameCont">
          <Col className="prfUsername">{getName}</Col>
          <Col className="prfAtUsername">@{getHandle}</Col>
        </Row>
        <Row className="prfBioCont">
          <Col className="prfBio">{getBio}</Col>
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
