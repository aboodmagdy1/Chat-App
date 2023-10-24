const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");



//@desc to get the profile of a specific user or me 
//@route Get /profile/:id
exports.getProfile = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  if(!id ) return res.redirect('/profile/'+req.session.userId)

  const user = await User.findById(id);// this is a another user not me 
  if (user) {
    return res.render("user/profile", {
      title: user.username,
      isLogged: true,
      username: user.username,
      userImage: user.image,
      //we have 4 diffrent senarios for get profile page and buttons 
      //1- if the user is owner if the profile page
      isOwner: id === req.session.userId, 
      //2-if i'm a frind of this user
      isFrinds: user.friends.find((frind)=>frind.id === req.session.userId),
      //3- if i'm send a friend request to this user
      isSentRequest: user.friendRequests.find(frind=>frind.id ===req.session.userId),
      //4- if i'm recived a friend request from this user
      isRecivedRequest: user.sentRequests.find(frind=>frind.id ===req.session.userId) 
    });
  } else {
    return next(new Error("User not found "));
  }
});