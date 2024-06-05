import { Document } from "mongoose";

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart extends Document {
  userId: string;
  items: CartItem[];
}
