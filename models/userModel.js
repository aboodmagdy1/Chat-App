const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: { type: String },
  confirmPassword: { type: String },
  image: { type: String, default: "default-profile-picture1.jpg" },
  isOnline: { type: Boolean, default: false },
  friends: {
    type: [
      {
        name: String,
        image: String,
        id: String,
      },
    ],
    default: [],
  },
  friendRequests: {
    type: [{ name: String, id: String }],
    default: [],
  },
  sentRequests:{
    type:[{name:String,id:String}],
    default: [],
  }
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
