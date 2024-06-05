import { Schema, model } from "mongoose";
import { Cart } from "./Cart.types";

const CartSchema = new Schema<Cart>({
  userId: { type: String, required: true },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

export default model<Cart>("Cart", CartSchema);
