// front socket handdling for friend request notifications
const addButton = document.getElementById("add_btn");
const myId = document.getElementById("myId").value;
const myName = document.getElementById("myName").value;
const myImage = document.getElementById("myImage").value;
const friendName = document.getElementById("friendName").value;
const friendImage = document.getElementById("friendImage").value;
const friendId = document.getElementById("friendId").value;

    addButton.onclick = (e) => {
        e.preventDefault();
        //the socket is available from the init.js file
        socket.emit("sendFriendRequest", {
          myId,
          myName,
          myImage,
          friendId,
          friendName,
          friendImage,
        });
      };


//to the user who sent the request
socket.on("friendRequestSent", () => {
  addButton.remove();
  const friendsForm = document.getElementById("friendsForm");
  friendsForm.innerHTML += `<input
    type="submit"
    value="Cancel  Request "
    class="btn btn-danger"
    formaction="/friend/cancel"
  />`;
});
