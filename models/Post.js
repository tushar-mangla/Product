const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "user",
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = Profile = mongoose.model("profile", ProfileSchema);
