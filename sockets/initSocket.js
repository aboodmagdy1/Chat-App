module.exports = (io) => {
  io.on("connection", (socket) => {
    //join notivication room from server
    socket.on("joinNotificationsRoom", (id) => {
      socket.join(id);
    });
    //inform server that i'm online
    socket.on("isOnline", (id) => {
      io.onlineUsers[id] = true;
      socket.on("disconnect", () => {
        io.onlineUsers[id] = false;
      });
    });


    
  });
};
