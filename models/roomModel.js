import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    room_name: { type: String, require: true },
    room_image : { type: String },
});

var Room = mongoose.model("Room", roomSchema);

export default Room;