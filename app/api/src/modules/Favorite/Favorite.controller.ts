import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth/authMiddleware";
import FavoriteModel from "./Favorite.model";
import ProductModel from "../Product/Product.model";
import NotFoundError from "../../middleware/error/NotFoundError";

const addFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { productId } = req.body;

    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    const favorite = new FavoriteModel({ user: user?._id, product: productId });
    const savedFavorite = await favorite.save();
    res
      .status(201)
      .json({ message: "Product added to favorites", data: savedFavorite });
  } catch (e) {
    next(e);
  }
};

const getFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const favorites = await FavoriteModel.find({ user: user?._id }).populate(
      "product"
    );
    res.json(favorites);
  } catch (e) {
    next(e);
  }
};

const removeFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;

    const favorite = await FavoriteModel.findOneAndDelete({
      _id: id,
      user: user?._id,
    });
    if (!favorite) {
      throw new NotFoundError("Favorite not found");
    }

    res.json({ message: "Product removed from favorites" });
  } catch (e) {
    next(e);
  }
};

export { addFavorite, getFavorites, removeFavorite };
