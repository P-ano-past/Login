const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, max: 50 },
  userPassword: { type: String, required: true },
  date: { type: Date, default: Date.now },
  friendList: {
    friendID: { type: String },
    isFriend: { type: Boolean },
    blocked: { type: Boolean },
  },
  profile: {
    firstName: { type: String, max: 50 },
    lastName: { type: String, max: 50 },
  },
  wall: {
    graff: { type: String, max: 250 },
    author: { type: String },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
