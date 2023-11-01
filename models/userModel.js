const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler')

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
        chatId:String
      },
    ],
    default: [],
  },
  //this is the requests that i will recive from other users
  friendRequests: {
    type: [{ name: String, id: String }],
    default: [],
  },
  //this is the requests that i will send to other users
  sentRequests: {
    type: [{ name: String, id: String }],
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const sendFriendRequest = asyncHandler(async (data)=>{
  //if i'm send frind req to a user
  // 1- add this user data to my sentRequests
 const seSentRequest =   User.updateOne(
    { _id: data.myId },
    {
      $push: {
        sentRequests: { id: data.friendId, name: data.userName },
      },
    }
  );

  // 2- add my data to this user friendRequests
  const setFriendRequests =  User.updateOne(
    { _id: data.friendId },
    { $push: { friendRequests: { id: data.myId, name: data.myName } } }
  );
  return await Promise.all([seSentRequest, setFriendRequests])

}) 

const getMyFriends = asyncHandler(async(myId)=>{
  let data =await  User.findById(myId,{friends:true})
  return data.friends
})
const User = mongoose.model("User", userSchema);
module.exports = {User, sendFriendRequest,getMyFriends}
