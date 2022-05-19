import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    name: {type: String, require: true},
});

var Room = mongoose.model("Room", roomSchema);

export default Room;