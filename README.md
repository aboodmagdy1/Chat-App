# Chat Application

- server-side rendering  chat application  built on [NodeJs](https://nodejs.org) and [Socket.io](https://socket.io)

## Key Features

* Authentication and Authorization: 
  * Signup , Login and Logout 

* real-time notifications:


* Friends request Operations : 
  * Accept: 
  assume you received a friend request from any user :
   * add  this user to my frinds list  and delete him from my friendRequests
   * add yourData to this user frinds list and delete yourData from his sentRequests
   
  * Reject : 
   * delete user data from yourData friendRequests
   * delete yourData from user sentRequests 

   assume you  sent a friend request to user 
  * Cancel :  
   * delete user data from yourData sentRequests
   * delete yourData from user friendRequests 



## Technologies Used

* [NodeJS](https://nodejs.org/en/) - JS runtime environment
* [Express](http://expressjs.com/) - The web framework used
* [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
* [Bootstrap](https://getbootstrap.com/) - Bootstrap

## Getting Started

Provide instructions on how to get a copy of your project up and running on a local machine.

### Prerequisites

What things the user needs to install the software and how to install them.

