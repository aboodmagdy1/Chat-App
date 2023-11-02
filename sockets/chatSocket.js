const { newMessage, getMessages } = require("../models/messageModel");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinChat", async (chatId) => {
      socket.join(chatId);
      const messages = await getMessages(chatId); // Fetch existing messages by chatId
      socket.emit("loadMessages", messages); // Send existing messages to the client
    });

    socket.on("sendMessage", (msg, cb) => {
      newMessage(msg).then(() => {
        io.in(msg.chat).emit("newMessage", msg);
        cb();
      });
    });
  });
};
