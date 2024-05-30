import { Document, ObjectId } from "mongoose";

export interface IMessage extends Document {
  sender: ObjectId;
  receiver: ObjectId;
  productId: ObjectId;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
