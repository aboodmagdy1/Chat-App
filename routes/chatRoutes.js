const express = require("express");

const { isAuth, notAuth } = require("../controllers/authController");
const {getChat}= require('../controllers/chatController')
const {getChatMessages} = require('../controllers/messagesController')
const router = express.Router();

router.use(isAuth);
router.get("/:chatId",getChatMessages ,getChat);

module.exports = router;
