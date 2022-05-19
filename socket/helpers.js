const { getTimeStamp} = require('../utils')

const GenerateMessage = (user , message,message_id ,message_type , attachments,) =>{
    return {
        user : user ,
        message_id : message_id,
        message : message,
        message_type : message_type ,
        attachments : attachments , 
        timestamp : getTimeStamp(),
    }
}

const MessageJoinRoom = (user) =>{
    let data = 
    { user: 'admin', 
      message_type : 2 ,
      timestamp : getTimeStamp()     
    }
    return data
}

const MessageUserSend = (user,message) =>{
    let data = 
    { user: user.name, 
      message: message ,
      message_type : 1 ,
      timestamp : getTimeStamp()     
    }
    return data
}
module.exports = {
    MessageJoinRoom,
    MessageUserSend,
    GenerateMessage
}; 
