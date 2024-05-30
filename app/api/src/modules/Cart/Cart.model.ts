import { Schema, model } from "mongoose";
import { ICart } from "./Cart.types";

const CartSchema = new Schema<ICart>({
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

export default model<ICart>("Cart", CartSchema);
