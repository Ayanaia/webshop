import { Document, ObjectId } from "mongoose";

export interface Product extends Document {
  name: string;
  description: string;
  price?: number;
  category: string;
  stock: number;
  images: string[];
  sellerId: ObjectId;
}
