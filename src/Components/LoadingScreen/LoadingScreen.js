import React, { Component } from "react";
import {
  UsernameConsumer,
  UsernameContext,
} from "../UsernameContext/UsernameContext";

export default class LoadingScreen extends Component {
  //   static contextType = UsernameContext;
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       profile: null,
  //     };
  //   }
  //   componentDidMount() {
  //     this._initProfile();
  //   }
  //   _initProfile() {
  //     const context = this.context;
  //     const profileData = {
  //       username: "johndoe",
  //     };
  //     context.setProfile(profileData);
  //   }
  //   render() {
  //     const { profile } = this.state;
  //     return (
  //       <div>
  //         <h3>{profile.username}</h3>
  //       </div>
  //     );
  //   }
  //   render() {
  //     return (
  //       <UsernameConsumer>
  //         {(username) => {
  //           return <div>hello {username}</div>;
  //         }}
  //       </UsernameConsumer>
  //     );
  //   }
}
