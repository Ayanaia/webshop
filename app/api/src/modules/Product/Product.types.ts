import { Document, ObjectId } from "mongoose";

export interface Product extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  sellerId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
