import { Request, Response, NextFunction } from "express";
import UserModel from "../User/User.model";
import { AuthRequest } from "../../middleware/auth/authMiddleware";
import NotFoundError from "../../middleware/error/NotFoundError";
import MessageModel from "./Message.model";

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { receiverId, productId, content } = req.body;

    const receiver = await UserModel.findById(receiverId);
    if (!receiver) {
      throw new NotFoundError("Receiver not found");
    }

    const message = new MessageModel({
      sender: user?._id,
      receiver: receiverId,
      productId,
      content,
      read: false,
    });

    const savedMessage = await message.save();
    res.status(201).json({ message: "Message sent", data: savedMessage });
  } catch (e) {
    next(e);
  }
};

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;

    const messages = await MessageModel.find({ receiver: user?._id }).populate(
      "sender productId"
    );
    res.json(messages);
  } catch (e) {
    next(e);
  }
};

const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;

    const message = await MessageModel.findOneAndUpdate(
      { _id: id, receiver: user?._id },
      { read: true },
      { new: true }
    );

    if (!message) {
      throw new NotFoundError("Message not found");
    }

    res.json(message);
  } catch (e) {
    next(e);
  }
};

//delete message
const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;

    const message = await MessageModel.findOneAndDelete({
      _id: id,
      $or: [{ sender: user?._id }, { receiver: user?._id }],
    });

    if (!message) {
      throw new NotFoundError("Message not found");
    }

    res.json({ message: "This message has been deleted" });
  } catch (e) {
    next(e);
  }
};

export { sendMessage, getMessages, markAsRead, deleteMessage };
