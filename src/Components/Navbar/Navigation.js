import React, { useContext } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import { Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Search from "./Search";

export default function Navigation() {
  const userContext = useContext(UsernameContext);
  const profileUsername = userContext.profile.usernameContext;

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
        <NavLink to="/">Home</NavLink> |
        {profileUsername ? (
          <NavDropdown title={profileUsername}>
            <NavDropdown.Item>
              <NavLink to="/public">Profile</NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink to="/Settings">Settings</NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink to="/about">About</NavLink>
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
