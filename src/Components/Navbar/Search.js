import React, { Component } from "react";
import {
  Button,
  Dropdown,
  FormGroup,
  FormControl,
  InputGroup,
  ToggleButton,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      searchQueries: "",
      selectValue: "",
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  //This is supposed to be the section where you click outside and the dropdown menu closes.
  // but uh.... i gotta figure some stuff out man. this ain't that important right now.

  // componentDidMount() {
  //   document.addEventListener("mousedown", this.handleClick, false);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener("mousedown", this.handleClick, false);
  // }

  toggleDropdown = (e) => {
    console.log("toggleClicked");
    this.setState((prevState) => ({
      showDropdown: !prevState.showDropdown,
    }));
    axios.get("api/user").then((res) => {
      console.log("res", res.data);
      this.setState({
        searchQueries: res.data,
      });
    });
    console.log("this.state", this.state);
  };
  friendSearch() {
    console.log("friendSearch trigg");
    console.log("searchQueries", this.state.searchQueries);
    console.log("this.state", this.state);
  }

  render() {
    return (
      <InputGroup>
        <FormGroup inline noValidate>
          {/* <Dropdown.Toggle> */}
          <FormControl
            placeholder="Search..."
            onClick={this.toggleDropdown}
            onChange={this.toggleDropdown}
            type="text"
          />
          <Dropdown.Menu show={this.state.showDropdown}>
            {this.state.searchQueries
              ? this.state.searchQueries.map((searchQueries) => {
                  console.log(searchQueries);
                  return (
                    <Dropdown.Item key={searchQueries}>
                      {searchQueries.username}
                    </Dropdown.Item>
                  );
                })
              : ""}
          </Dropdown.Menu>
          {/* </Dropdown.Toggle> */}
          <Button
            variant="outline-success"
            onClick={(e) => {
              this.friendSearch();
            }}
          >
            Search
          </Button>
        </FormGroup>
      </InputGroup>
    );
  }
}
// Modify state change to trigger dropdown on click of the input box.
// useEffect??? for possibly refreshing the api call to get users info.
//
