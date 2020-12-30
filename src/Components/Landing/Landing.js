import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class Landing extends Component {
  render() {
    return (
      <Container>
        <h3>Welcome!</h3>
        <h4>Warning!</h4>
        <p>This is simply a demonstration in the use case of a login form.</p>
        <h4>How it works:</h4>
        <ul>
          <li>"signing in" requires a user name and password</li>
          <br />
          <li>
            When clicking the submit button, the user's password is hashed using
            a 3rd party module and then sent to a MongoDB back end.
          </li>
          <br />
          <li>
            Viewing the password utilizes an axios GET request and the 3rd party
            hashing tool to decrypt the password in order to display the
            password in plain text.
          </li>
          <br />
          <li>
            The username gets stored in as a string and passed through React
            Context so it can be accessed throughout the rest of the web app.
          </li>
          <br />
          <li>
            <b>
              It is highly recommended that you do not use your personal
              passwords when using this application.
            </b>
          </li>
          <br />
        </ul>
      </Container>
    );
  }
}
