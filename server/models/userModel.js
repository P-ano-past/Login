const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, max: 50 },
  userPassword: { type: String, max: 100 },
  date: { type: Date, default: Date.now },
  friendList: {
    friendID: { type: String },
  },
  blocked: { friendID: { type: String } },
  profile: {
    firstName: { type: String, max: 50 },
    lastName: { type: String, max: 50 },
  },
  posts: [
    {
      post: { type: String, max: 250 },
      postAuthor_id: { type: String, max: 50 },
      author: { type: String },
      date: { type: Date, default: Date.now },
      likes: {
        who: { type: String },
        numberOf: { type: Number },
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
