// this script for handel the connectons from the server

const { sendFriendRequest } = require("../models/userModel");
// i will make the socket.io send the frined request by it self
//1) user-1 ckick add Friend button to add user-2 then the sendFriendRequest is emitted
//2) sendFriendRequest() to make the sendFriendRequest logic then
// ----inform user1 that his req is sent and inform user-2 that he as a new friend req

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("sendFriendRequest", (data) => {
      // this is common event so it'will  be handled in init.js
      sendFriendRequest(data)
        .then(() => {
          //this notification for user-1(sender) this event is private for each user
          socket.emit("friendRequestSent");
          //this notification for user-2(reciver)
          io.to(data.friendId).emit("newFriendRequest", {
            // this is common event so it'will  be handled in init.js
            name: data.myName,
            id: data.myId,
          });
        })
        .catch((error) => {
          socket.emit("requestFailed");
        });
    });
  });
};
