const express = require("express");

const { isAuth, notAuth } = require("../controllers/authController");
const {getChat}= require('../controllers/chatController')
const router = express.Router();

router.use(isAuth);
router.get("/:chatId", getChat);

module.exports = router;
