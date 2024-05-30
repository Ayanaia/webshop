import { Schema, model, Document } from "mongoose";

export interface IFavorite extends Document {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
}

const FavoriteSchema = new Schema<IFavorite>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

export default model<IFavorite>("Favorite", FavoriteSchema);
