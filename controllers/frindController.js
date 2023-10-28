const {User} = require("../models/userModel");
const asyncHandler = require("express-async-handler");


// @desc cancel  frind request that i send  to this user
// @route POST /frind/cancel
// @access protected

exports.cancelRequest = asyncHandler(async (req, res, next) => {
  const { myId, myName, myImage, friendId, userName, userImage } = req.body;
  //1- delete the user data from my sentRequests
  await User.updateOne(
    { _id: myId },
    {
      $pull: {
        sentRequests: { id: friendId },
      },
    }
  );
  //2- delete my data form frindRequests of the user(friend)
  await User.updateOne(
    { _id: friendId },
    { $pull: { friendRequests: { id: myId } } }
  );

  res.redirect("/profile/" + friendId);
});

// @desc accept frind request that comes from this user
// @route POST /frind/accept
// @access protected
exports.acceptRequst = asyncHandler(async (req, res, next) => {
  const { myId, myName, myImage, friendId, userName, userImage } = req.body;
  //if i accept frind req from a user
  //1- add  this user to my frinds  and delete him from my friendRequests
  await User.updateOne(
    { _id: myId },
    {
      $push: {
        friends: { id: friendId, name: userName, image: userImage },
      },
      $pull: {
        friendRequests: { id: friendId },
      },
    }
  );
  //2- add me to this user frinds and delete me from his sentRequests
  await User.updateOne(
    { _id: friendId },
    {
      $push: { friends: { id: myId, name: myName, image: myImage } },
      $pull: { sentRequests: { id: myId } },
    }
  );

  res.redirect("/profile/" + friendId);
});
// @desc reject frind request that comes from this user
// @route POST /frind/reject
// @access protected

exports.rejectRequst = asyncHandler(async (req, res, next) => {
  const { myId, myName, myImage, friendId, userName, userImage } = req.body;
  //if i reject frind req from a user
  //1- delete user data from my friendRequests
  await User.updateOne(
    { _id: myId },
    {
      $pull: {
        friendRequests: { id: friendId },
      },
    }
  );
  //2- delet my data form sentRequests of the user(friend)
  await User.updateOne(
    { _id: friendId },
    { $pull: { sentRequests: { id: myId } } }
  );

  res.redirect("/profile/" + friendId);
});

// @desc delete user of this profile  to my frinds
// @route POST /frind/delete
// @access protected
exports.deleteFriend = asyncHandler(async (req, res, next) => {
  const { myId, myName, myImage, friendId, userName, userImage } = req.body;
  //if i delete delete frinds
  //1- delete user data from my frinds
  await User.updateOne(
    { _id: myId },
    {
      $pull: {
        friends: { id: friendId },
      },
    }
  );
  //2- delet my data form frinds of the user(friend)
  await User.updateOne(
    { _id: friendId },
    { $pull: { friends: { id: myId } } }
  );

  res.redirect("/profile/" + friendId);
});
