// JavaScript
socket.emit("getOnlineFriends", id);
socket.on("onlineFriends", (friends) => {
  let onlineFriendsDiv = document.getElementById("onlineFriends");

  if (friends.length === 0) {
    onlineFriendsDiv.innerHTML = `
      <p class="alert alert-info">You don't have any online friends.</p>
    `;
  } else {
    let html = `
      <div class="row">
    `;
    for (let friend of friends) {
      html += `
        <div class="col col-12 col-md-6 col-lg-4">
          <div class="card">
            <img src="/imgs/${friend.image}" class="card-img-top" alt="Friend Image">
            <div class="card-body">
              <h5 class="card-title"><a href="/profile/${friend.id}">${friend.name}</a></h5>
              <a href="/chat/${friend.chatId}" class="btn btn-primary">Chat</a>
            </div>
          </div>
        </div>
      `;
    }
    html += `</div>`;
    onlineFriendsDiv.innerHTML = html;
  }
});