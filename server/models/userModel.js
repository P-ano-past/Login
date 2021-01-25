const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  userPassword: { type: String, required: true },
  date: { type: Date, default: Date.now },
  friendList: {
    friendID: { type: String },
    isFriend: { type: Boolean },
    blocked: { type: Boolean },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
