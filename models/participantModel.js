import mongoose from "mongoose";

const participantSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
});

var Participant = mongoose.model("Participant", participantSchema);

export default Participant;