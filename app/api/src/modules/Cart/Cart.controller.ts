import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth/authMiddleware";
import CartModel from "./Cart.model";
import NotFoundError from "../../middleware/error/NotFoundError";
import { ICart, ICartItem } from "./Cart.types";

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { productId, quantity } = req.body;

    const cart = (await CartModel.findOne({ userId: user!._id })) as ICart;

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item: ICartItem) => item.productId.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
      res.json(cart);
    } else {
      const newCart = new CartModel({
        userId: user!._id,
        items: [{ productId, quantity }],
      });
      await newCart.save();
      res.json(newCart);
    }
  } catch (e) {
    next(e);
  }
};

const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;

    const cart = (await CartModel.findOne({ userId: user!._id }).populate(
      "items.productId"
    )) as ICart;
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }
    res.json(cart);
  } catch (e) {
    next(e);
  }
};

const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { productId } = req.params;

    const cart = (await CartModel.findOne({ userId: user!._id })) as ICart;
    if (cart) {
      cart.items = cart.items.filter(
        (item: ICartItem) => item.productId.toString() !== productId
      );
      await cart.save();
      res.json(cart);
    } else {
      throw new NotFoundError("Cart not found");
    }
  } catch (e) {
    next(e);
  }
};

export { addToCart, getCart, removeFromCart };
