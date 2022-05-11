import express from "express";
import { getMessagesListRoom } from "../controllers/messageControllers.js";
const router = express.Router();

router.get("/list/:room_id", getMessagesListRoom);

export default router;