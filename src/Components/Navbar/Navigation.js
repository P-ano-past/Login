import React, { useContext, useState } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import {
  Navbar,
  Button,
  NavDropdown,
  NavDropdownProps,
  Form,
  FormControl,
  FormControlProps,
  Input,
  InputGroup,
  InputGroupProps,
} from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";

export default function Navigation() {
  const userContext = useContext(UsernameContext);
  const profileUsername = userContext.profile.usernameContext;
  const profileID = userContext.profile._id;
  const [searchResults, setSearchResults] = useState("");

  const signOutHandler = (e) => {
    console.log("Signout clicked");
    userContext.setProfile({ isLoggedIn: false, redirect: "/" });
  };

  const friendSearch = (e) => {
    axios.get("/api/user").then((res) => {
      res.data.map((userInfo) => {
        setSearchResults({ userInfo: userInfo.username });
        console.log(searchResults);
      });
    });
  };

  return (
    <Navbar>
      <Navbar.Brand href="/">Password Hash Test!</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {profileUsername ? (
          <InputGroup>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button
                variant="outline-success"
                onClick={(e) => {
                  friendSearch();
                }}
              >
                Search
              </Button>
            </Form>
          </InputGroup>
        ) : (
          ""
        )}
        <NavLink to="/">Home</NavLink> | <NavLink to="/about">About</NavLink>|
        <Navbar.Text>
          {profileUsername ? (
            <NavDropdown title={profileUsername}>
              <NavDropdown.Item>
                <NavLink to="/Settings">Settings</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={(e) => signOutHandler()}>
                <NavLink to="/">Sign out</NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <div>
              <NavLink to="/signin">Sign in</NavLink> or
              <NavLink to="/register"> Register</NavLink>
            </div>
          )}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

//avelasco@mvusd 9515717625
