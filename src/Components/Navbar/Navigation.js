import React, { useContext, useState } from "react";
import { UsernameContext } from "../../Utils/UsernameContext/UsernameContext";
import {
  Navbar,
  Button,
  NavDropdown,
  NavDropdownProps,
  FormGroup,
  Form,
  FormControl,
  FormControlProps,
  Input,
  InputGroup,
  InputGroupProps,
  Dropdown,
  DropdownProps,
} from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";

export default function Navigation() {
  const userContext = useContext(UsernameContext);
  const profileUsername = userContext.profile.usernameContext;
  const profileID = userContext.profile._id;
  const [searchQueries, setSearchQueries] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [showDropdown, setDropDown] = useState("");

  const signOutHandler = (e) => {
    console.log("Signout clicked");
    userContext.setProfile({ isLoggedIn: false, redirect: "/" });
  };

  const friendSearch = (e) => {
    axios
      .get("/api/user")
      .then((res) => setSearchQueries(res.data))
      .catch((err) => console.log(err));
    // this is where the toggle for the dropdown list should be triggered to show.
    console.log(searchResults);
  };

  const handleSearchInput = (e) => {
    console.log(e);
    setDropDown(e);
  };

  return (
    <Navbar>
      <Navbar.Brand href="/">nSpace</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {profileUsername ? (
          <InputGroup>
            <FormGroup
              inline
              // onSubmit={(e) => {
              //   formClick();
              // }}
              noValidate
            >
              <Dropdown>
                <FormControl
                  placeholder="Search..."
                  type="text"
                  value={searchResults}
                  onChange={(e) => setSearchResults(e.target.value)}
                />

                <Dropdown.Menu
                  onSelect={(e) => {
                    handleSearchInput();
                  }}
                  show
                >
                  {searchQueries
                    ? searchQueries.map((searchQueries) => {
                        console.log(searchQueries);
                        return (
                          <Dropdown.Item key={searchQueries}>
                            {searchQueries.username}
                          </Dropdown.Item>
                        );
                      })
                    : ""}
                </Dropdown.Menu>
              </Dropdown>

              <Button
                variant="outline-success"
                onClick={(e) => {
                  friendSearch();
                }}
              >
                Search
              </Button>
            </FormGroup>
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
