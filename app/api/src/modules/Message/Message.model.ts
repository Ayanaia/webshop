import { Schema, model, Document } from "mongoose";

export interface IMessage extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  content: string;
  read: boolean;
}

const MessageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
});

export default model<IMessage>("Message", MessageSchema);
