import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  sellerId: Schema.Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  images: { type: [String], required: false },
  sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model<IProduct>("Product", ProductSchema);
