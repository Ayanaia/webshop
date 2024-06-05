import { Document, ObjectId } from "mongoose";
import { User } from "../User/User.types";
import { Product } from "../Product/Product.types";

export interface Message extends Document {
  sender: User;
  receiver: User;
  productId: Product;
  content: string;
  read: boolean;
  createdAt: Date;
}
