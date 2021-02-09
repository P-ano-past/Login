import React, { useContext, useState } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import {
  Navbar,
  Button,
  NavDropdown,
  FormGroup,
  FormControl,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
import Search from "./Search";

export default function Navigation() {
  const userContext = useContext(UsernameContext);
  const profileUsername = userContext.profile.usernameContext;
  const profileID = userContext.profile._id;

  const [searchQueries, setSearchQueries] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [dropdownShow, setDropdownShow] = useState(Boolean);

  const signOutHandler = (e) => {
    console.log("Signout clicked");
    userContext.setProfile({ isLoggedIn: false, redirect: "/" });
  };

  return (
    <Navbar>
      <Navbar.Brand href="/">nSpace</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {profileUsername ? (
          <Search />
        ) : (
          // insert search.js here
          ""
        )}
        <NavLink to="/">Home</NavLink> | <NavLink to="/about">About</NavLink>|
        <Navbar.Text></Navbar.Text>
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
      </Navbar.Collapse>
    </Navbar>
  );
}
