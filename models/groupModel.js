const mongoose = require("mongoose");


const groupSchema = new mongoose.Schema({
    groupName:String,
    groupImage:String,
    groupMembers:[{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }],
    chatId : String
})
const Group = mongoose.model("Group",groupSchema)

const getUserGroups = async(userId)=>{
    try{
        const groups = await Group.find({groupMembers:{$in:[userId]}})
        return groups
    }catch(err){
    throw new Error(err)
    }
}


module.exports = {Group,getUserGroups}