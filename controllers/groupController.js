const asyncHandler = require("express-async-handler");
const { getMyFriends } = require("../models/userModel");
const { Group, getUserGroups } = require("../models/groupModel");
const { getMessages } = require("../models/messageModel");
const { Chat, getChatUsers } = require("../models/chatModel");

// @desc get create group page
// @route Get /group/create
// @access protected
exports.getCreatePage = asyncHandler(async (req, res, next) => {
  const myFriends = await getMyFriends(req.session.userId);
  res.render("group/createGroup", {
    title: "Create Group",
    isLogged: req.session.userId,
    friendRequests: req.friendRequests,
    friends: myFriends,
  });
});
// @desc  create group
// @route Post /group/create
// @access protected
exports.createGroup = asyncHandler(async (req, res, next) => {
  let { groupName, groupMembers } = req.body;
  const groupImage = req.file.filename;
  // Ensure groupMembers is always an array
  if (!Array.isArray(groupMembers)) {
    groupMembers = [groupMembers]; // Convert to array if it's a string
  }
  // Add your user ID to groupMembers array
  groupMembers.push(req.session.userId);

  //make chat with this three members
  const newChat = await Chat.create({ users: groupMembers });
  const chatId = newChat._id.toString();
  const newGroup = await Group.create({
    groupName,
    groupImage,
    groupMembers,
    chatId: chatId,
  });
  res.redirect("/group/groups");
});

// @desc  get all groups
// @route Get /group/groups
// @access protected
exports.getMyGroups = asyncHandler(async (req, res, next) => {
  getUserGroups(req.session.userId).then((groups) => {
    res.render("group/groups", {
      title: "Create Group",
      isLogged: req.session.userId,
      friendRequests: req.friendRequests,
      groups,
    });
  });
});

// @desc  get  group
// @route Get /group/id/chat
// @access protected
exports.getGroupChat = asyncHandler(async (req, res, next) => {
  const groupId = req.params.id;
  const group = await Group.findOne({ _id: groupId }, { chatId: true });
  const chatId = group.chatId;
  // Fetch the messages for the chat
  const messages = await getMessages(chatId);

 const chat = await getChatUsers(chatId)//return chat
 const friendsData = chat.users
  // Render the chat page with the messages and other necessary data
  res.render("user/chat", {
    title: "Chat",
    isLogged: req.session.userId,
    friendRequests: req.friendRequests,
    messages: messages,
    chatId: chatId,
    friendsData:friendsData,
  });
});
