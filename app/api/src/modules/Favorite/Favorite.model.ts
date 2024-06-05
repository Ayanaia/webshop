import { Schema, model, Document } from "mongoose";
import { Favorite } from "./Favorite.types";

const FavoriteSchema = new Schema<Favorite>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

export default model<Favorite>("Favorite", FavoriteSchema);
