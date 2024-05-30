import { Router } from "express";
import { authJwt } from "../../middleware/auth/authMiddleware";
import {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} from "./Message.controller";

const router = Router();

router.post("/messages", authJwt, sendMessage);
router.get("/messages", authJwt, getMessages);
router.put("/messages/:id/read", authJwt, markAsRead);
router.delete("/messages/:id", authJwt, deleteMessage);

export default router;
