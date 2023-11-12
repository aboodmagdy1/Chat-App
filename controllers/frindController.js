const { User } = require("../models/userModel");
const  Chat = require("../models/chatModel");
const asyncHandler = require("express-async-handler");

// @desc my all friends
// @reoute friend/all
// @access protected
exports.getMyFriends = asyncHandler(async (req, res, next) => {
  const myId = req.session.userId;
  const myFriends = await User.findOne({ _id: myId }, { friends: true }); // the returned value is frinds and document id
  if (myFriends) {
    res.render("user/friends", {
      title: "My Friends",
      isLogged: req.session.userId,
      friendRequests: req.friendRequests,
      friends: myFriends.friends,
    });
  } else {
    return next(new Error("No Friends Found "));
  }
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
  let newChat = await Chat.create({
    users: [myId, friendId],
  }); //create a new chat between me and the user an pass the id

  await User.updateOne(
    { _id: myId },
    {
      $push: {
        friends: {
          id: friendId,
          name: userName,
          image: userImage,
          chatId: newChat._id,
        },
      },
      $pull: {
        friendRequests: { id: friendId },
      },
    }
  );

  await User.updateOne(
    { _id: friendId },
    {
      $push: {
        friends: {
          id: myId,
          name: myName,
          image: myImage,
          chatId: newChat._id,
        },
      },
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

  await User.updateOne(
    { _id: myId },
    {
      $pull: {
        friendRequests: { id: friendId },
      },
    }
  );

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

  await User.updateOne(
    { _id: myId },
    {
      $pull: {
        friends: { id: friendId },
      },
    }
  );

  await User.updateOne({ _id: friendId }, { $pull: { friends: { id: myId } } });

  res.redirect("/profile/" + friendId);
});
