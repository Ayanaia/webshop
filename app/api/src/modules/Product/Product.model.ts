import { Schema, model, Document } from "mongoose";
import { Product } from "./Product.types";

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: false },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  images: { type: [String], required: false },
  sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model<Product>("Product", ProductSchema);
