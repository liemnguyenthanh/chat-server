import express from "express";
import { getMessagesListRoom } from "../controllers/messageControllers.js";
const router = express.Router();

router.post("/create", getMessagesListRoom);

export default router;