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

**Add Friend** : when a user click on add friend button to send friend Request

- when the user is logged in he is in a unieque room to recive the friend request on it (socket.io)
- the sender's data is added to the recipient's friend request list .
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

### Real-time Private Chat and Messages :

- **getChat**
- we explain before that when user accept friend request we create a chat to them
- so when user click on the chat button he joined this chat room
- when send btn is clicked a new message is created in DB and send to the client socket to apper in the fron
- every user have a unique color for him to can distinguish between senders

### Real-time Group Chat and Groups :

- **getCreatePage,createGroup**
- user can create a group chat by adding name ,images and group members form his frineds
- when user click on the create Group btn we create a chat for this group .
- the chat is only for group member and have a unique id

- **getMyGroups**
- page to display all user groups that belongs to or created by him

- **getGroupChat**
- To get the chat of a specific group and messages
- each member have it's own color .i made it because this is a backend project so i use it to distinguish between users

## Demonstration 🖥️

#### Signup , Login ,Logout Pages :

  <img src="https://github.com/aboodmagdy1/Chat-App/blob/main/public/videos/auth.gif" alt="auth img" width="900"  height="500" >

#### The Notifications(add friend , cancel Request) :

  <img src="https://github.com/aboodmagdy1/Chat-App/blob/main/public/videos/notification.gif" alt="notification img" width="900"  height="500" >

#### Friends Page , operations and Home Page :

  <img src="https://github.com/aboodmagdy1/Chat-App/blob/main/public/videos/friends.gif" alt="friends img" width="900"  height="500" >

#### Private Chat :

  <img src="https://github.com/aboodmagdy1/Chat-App/blob/main/public/videos/privateChat.gif" alt="private img" width="900"  height="500" >

#### Group and Group Chat :

  <img src="https://github.com/aboodmagdy1/Chat-App/blob/main/public/videos/groups.gif" alt="group img" width="900"  height="500" >


## To do 
- make admin for group 
- delete group if user is the admin
- leave group if user is a member not admin 

## Getting Started
1. Clone the repository to your local machine.
2. Install the required dependencies.

  You can fork the app or you can git-clone the app into your local machine. Once done, please install all the
  dependencies by running
  ```
  $ npm i
    Strat work
  $ npm start 

3. Configure the project settings.
- just in the .env file add this :
- DB_URI  : you DB URI
- PORT : as you like (say 3000) 

4. Run the project locally.

## Usage
- run the project and go to browser .. http://localhost:3000
- You should use different browse for each user because of the sessioins settings


## Build With 🏗️

* [NodeJS](https://nodejs.org/en/) - JS runtime environment
* [Express](http://expressjs.com/) - The web framework used
* [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
* [Socket.io](https://socket.io) - For real time streaming
* [BootStrap](https://getbootstrap.com/) - For styling purposes
* [ejs](https://ejs.co/) - View Engine  For building the Views 
