import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
<<<<<<< HEAD
    name: {type: String, require: true},
=======
    room_name: { type: String, require: true },
    room_image : { type: String },
>>>>>>> 76a7d0ec621c364bd7152c3da51e368a619f1f47
});

var Room = mongoose.model("Room", roomSchema);

export default Room;