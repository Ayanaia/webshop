import { Document, ObjectId, Schema } from "mongoose";

export interface Favorite extends Document {
  user: ObjectId;
  product: ObjectId;
}
