import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    room_id: { type: String,require: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, require: true },
    message_type: { type: String, require: true },
    timestamp : { type: Number,require: true },
});

var Message = mongoose.model("Message", messageSchema);

export default Message;