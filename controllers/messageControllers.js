
import Message from '../models/messagesModel.js';

export const createMessage = async (messages) => {
    console.log("messages",messages);
    const new_message = new Message(message);
    return new_message;
};

export const getMessagesListRoom = async (req, res) => {
    try {
      const { room_id } = req.params;
      if (!room_id) {
        return res .status(404)
          .json({ success: false, message: "Error room_id!!" });
      } 
      let list =await  Message.find({ room_id : room_id})
      res.status(201).json({ success: true, detail: list });
    } catch (error) {
      res.status(409).json({ success: false, message: error.message });
    }
  };

export const saveMessage = async (req, res) => {
  try {
    console.log(req);
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
}