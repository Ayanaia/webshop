import { Schema, model, Document } from "mongoose";
import { Message } from "./Message.types";

const MessageSchema = new Schema<Message>({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: false },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default model<Message>("Message", MessageSchema);
