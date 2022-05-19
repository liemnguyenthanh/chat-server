import express from "express";
import { getMessagesListRoom, saveMessage } from "../controllers/messageControllers.js";
const router = express.Router();

router.get("/list/:room_id", getMessagesListRoom);
router.post("/save-message", saveMessage)

export default router;