import { Document, ObjectId } from "mongoose";

export interface IFavorite extends Document {
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
