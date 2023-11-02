const express = require("express");
const { isAuth, notAuth } = require("../controllers/authController");
const {
  createGroup,
  getCreatePage,
  getMyGroups,
  getGroupChat,
} = require("../controllers/groupController");
const { uploadGroupImage } = require("../utils/uploadImages"); // Import the uploadGroupImage middleware
const router = express.Router();

router.use(isAuth);
router.get("/groups", getMyGroups);
router.get("/:id/chat", getGroupChat);
router.route("/create").get(getCreatePage).post(uploadGroupImage, createGroup); // Use the uploadGroupImage middleware here

module.exports = router;
