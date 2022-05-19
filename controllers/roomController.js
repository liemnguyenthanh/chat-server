export const createRoomByUser = async (req, res) => {
  try {
    const { users } = req.params;
    if (!room_id) {
      return res
        .status(404)
        .json({ success: false, message: "Error room_id!!" });
    }
    let list = await Message.find({ room_id: room_id });
    res.status(201).json({ success: true, detail: list });
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};