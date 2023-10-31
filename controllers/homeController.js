const asyncHandler = require("express-async-handler");

//@desc render home page
//@route GEt /
exports.getHome = asyncHandler(async (req, res, next) => {
  res.render("index", {
    title: "Home",
    isLogged: req.session.userId,
    friendRequests: req.friendRequests,
  });
});
