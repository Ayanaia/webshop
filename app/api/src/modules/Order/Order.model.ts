import mongoose, { Schema, Document } from "mongoose";
import { Order, OrderItem } from "./Order.types";

const OrderItemSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [OrderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, default: "ordered" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Order>("Order", OrderSchema);
