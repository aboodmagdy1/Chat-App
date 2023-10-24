const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// @desc add user of this profile  to my frinds
// @route POST /frind/add
// @access protected
exports.addFriend = asyncHandler(async (req, res, next) => {
  const { myId, myName, myImage, friendId, userName, userImage } = req.body;
  //if i send frind req to a user
  // 1- add this user data to my sentRequests
  await User.updateOne(
    { _id: myId },
    {
      $push: {
        sentRequests: { id: friendId, name: userName },
      },
    }
  );

  // 2- add my data to this user friendRequests
  await User.updateOne(
    { _id: friendId },
    { $push: { friendRequests: { id: myId, name: myName } } }
  );

  res.redirect("/profile/" + friendId);
});

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

// @desc delete user of this profile  to my frinds
// @route POST /frind/delete
// @access protected
exports.deleteFriend = asyncHandler(async (req, res, next) => {});

// @desc accept frind request that comes from this user
// @route POST /frind/accept
// @access protected
exports.acceptRequst = asyncHandler(async (req, res, next) => {});
// @desc reject frind request that comes from this user
// @route POST /frind/reject
// @access protected

exports.rejectRequst = asyncHandler(async (req, res, next) => {});
