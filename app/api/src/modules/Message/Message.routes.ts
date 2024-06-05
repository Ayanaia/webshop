import { Router } from "express";
import { authJwt } from "../../middleware/auth/authMiddleware";
import {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} from "./Message.controller";

const router = Router();

router.post("/", authJwt, sendMessage);
router.get("/", authJwt, getMessages);
router.put("/:id/read", authJwt, markAsRead);
router.delete("/:id", authJwt, deleteMessage);

export default router;
