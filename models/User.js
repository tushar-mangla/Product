const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Email = new mongoose.Schema({
  type: String,
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },

  likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: Array,
    default: [],
  },
});

module.exports = User = mongoose.model("user", UserSchema);
