const mongoose = require("mongoose");


const chatSchema = new  mongoose.Schema({
    users:[{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }]  //this array will contain myId and friendId 
})
const Chat = mongoose.model("Chat", chatSchema);

const getChatUsers = async(chatId)=>{
    try{
        const chat = await Chat.findById(chatId).populate('users')
        return chat
    }catch(err){
        throw new Error(err)
    }

}

module.exports = {Chat,getChatUsers}