const { Message } = require("../models/messageModel");
const asyncHandler = require("express-async-handler");

exports.getChatMessages = asyncHandler(async (req, res, next) => {
  const chatId = req.params.chatId;

  const messages = await Message.find({ chat: chatId }, null, {
    sort: { timestamps: -1 },
  }).populate({
    path: "chat",
    model: "Chat",
    populate: {
      path: "users",
      model: "User",
      select: "username image",
    },
  });

  if (messages) {
    req.messages = messages;
    next();
  } else {
    res.status(404);
    throw new Error("messages not found");
  }
});

