const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const messageSchema = new mongoose.Schema(
  {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    content: String,
    sender: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

const newMessage = async (msg) => {
  try {
    let newMsg = await Message.create(msg);
    return;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = { Message, newMessage };
