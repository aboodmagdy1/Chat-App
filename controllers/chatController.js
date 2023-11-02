const { getMessages } = require("../models/messageModel");
const { getChatUsers } = require("../models/chatModel");

const asyncHandler = require("express-async-handler");
//@desc display private chat data 
exports.getChat = asyncHandler(async (req, res, next) => {
  const chatId = req.params.chatId 

  getMessages(chatId).then((messages) => {
    //if there is no messages in the chat
    if (messages.length === 0) {
      getChatUsers(chatId).then((chat) => {
        let friendsData = chat.users.find(
          (user) => user._id != req.session.userId
        );
        res.render("user/chat", {
          title: "Chat",
          isLogged: req.session.userId,
          friendRequests: req.friendRequests,
          messages: messages,
          //git my frind data using the fris message document if it exist
          friendsData: friendsData,
          chatId : chatId
        });
      });
    } else {
      //if there is messages in the chat
      let friendData = messages[0].chat.users.find(
        (user) => user._id != req.session.userId
      );
      res.render("user/chat", {
        title: "Chat",
        isLogged: req.session.userId,
        friendRequests: req.friendRequests,
        messages: messages,
        //git my frind data using the fris message document if it exist
        friendData: friendData,
        chatId : chatId
      });
    }
  });
});
