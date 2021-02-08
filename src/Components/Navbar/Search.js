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
      showDropdown: Boolean,
      searchQueries: "",
      selectValue: "",
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown = (e) => {
    console.log("toggleClicked");
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
    axios.get("api/user").then((res) => {
      console.log("res", res.data);
      this.setState({
        searchQueries: res.data,
        show: true,
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
          <FormControl
            placeholder="Search..."
            onClick={this.toggleDropdown}
            onChange={this.toggleDropdown}
            type="text"
          />
          <Dropdown
            onChange={(e) => {
              this.toggleDropdown();
            }}
          >
            <Dropdown.Menu show={this.state.show}>
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
          </Dropdown>

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
