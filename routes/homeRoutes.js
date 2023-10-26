const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.render("index", {
      title: "Home",
      isLogged: req.session.userId,
      friendRequests: req.friendRequests,
    });
  })
);

module.exports = router;
