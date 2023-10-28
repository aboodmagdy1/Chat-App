


module.exports = function (socket) {
  socket.on("joinNotificationsRoom", (id) => {
    socket.join(id); // this id to make the room is have a unique name (id of the sender )
  });
};
