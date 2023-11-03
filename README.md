# Chat App

- server side rendering realtime chat application buit on [NodeJs](https://nodejs.org) and [Socket.io](https://socket.io)
  <h1 align="center">
    <br>
  <img src="https://github.com/aboodmagdy1/Chat-App/blob/main/public/imgs/chat-app.png" alt="Chat App" width="200">
    <br>
   Realtime Chat App

    <br>
  </h1>

## Key Features

### Authentication and Authorization

- **Signup, Login, and Logout**: Users can create an account, log in to their account, and log out when they are done.

### Real-time Notifications

**Add Friend** : when a user click on add friend button to send friend Request - when the user is logged in he is in a unieque room to recive the friend request on it (socket.io) - the sender's data is added to the recipient's friend request list .

- the recipient's data is added to the sender's sent request list .

### Friends Request Operations

Friend request operations allow users to manage their friend requests effectively. The following operations are supported:

- **Accept**: When a user accept a friend request from another user, the following actions are performed:

  - The sender's data is added to the recipient's friends list.
  - The friend request is deleted from the recipient's friend requests.
  - The recipient's data is added to the sender friends list.
  - The recipient's data is deleted from the sender's sent requests.
  - new chat is created between the sender and the recipient

- **Reject**: When a user reject a friend request from another user, the following actions are performed:

  - The friend request is deleted from the recipient's friend requests.
  - The recipient's data is deleted from the sender's sent requests.

- **Cancel**: If a user sent a friend request to another user and want to cancel , the following actions are performed:

  - The recipient's data is deleted from the sender's sent requests.
  - The sender's data is deleted from the recipient's friend requests.

- **Delete** : If a user delete a friend from his friends list, the following actions are performed
  - the friend data is deleted form user friends list
  - the user data is delted form the this friend friends list
  - the chats and messages are deleted

## Getting Started

To get started with the project, follow these instructions:

1. Clone the repository to your local machine.
2. Install the required dependencies.
3. Configure the project settings.
4. Run the project locally.

## Usage

- You should use different browse for each user because of the sessioins settings
