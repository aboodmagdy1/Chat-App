// in this fiel i will initialize the socket.io connection in any page i render  (front socket)
//elements 
const dropdownBtn = document.getElementById('friendRequestsDropdown')


//i will use it to make a reat-time notification
const socket = io();

socket.on("connect", () => {
  let id = document.getElementById("userId").value;
  socket.emit("joinNotificationsRoom", id);
});

socket.on("newFriendRequest", (data) => {
  const friendRequests = document.getElementById("friendRequests");
  const span =friendRequests.querySelector('span')
  if (span) {
    span.remove()
  }
  friendRequests.innerHTML += `<a class="dropdown-item" href="/profile/${data.id}">${data.name }</a>`;
    dropdownBtn.classList.remove('btn-info')
    dropdownBtn.classList.add('btn-danger')
});

dropdownBtn.onclick = function(e){
    e.preventDefault()
    dropdownBtn.classList.add('btn-info')
    dropdownBtn.classList.remove('btn-danger')

}