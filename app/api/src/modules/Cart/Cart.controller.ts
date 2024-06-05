import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth/authMiddleware";
import CartModel from "./Cart.model";
import ProductModel from "../Product/Product.model";
import NotFoundError from "../../middleware/error/NotFoundError";
import { Cart, CartItem } from "./Cart.types";
import Order from "../Order/Order.model";

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { productId, quantity } = req.body;

    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    if (quantity > product.stock) {
      res.status(400).json({ message: `Only ${product.stock} items in stock` });
      return;
    }

    const cart = (await CartModel.findOne({ userId: user!._id })) as Cart;

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item: CartItem) => item.productId.toString() === productId
      );
      if (itemIndex > -1) {
        if (cart.items[itemIndex].quantity + quantity > product.stock) {
          res
            .status(400)
            .json({ message: `Only ${product.stock} items in stock` });
          return;
        }
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
    )) as Cart;
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

    const cart = (await CartModel.findOne({ userId: user!._id })) as Cart;
    if (cart) {
      cart.items = cart.items.filter(
        (item: CartItem) => item.productId.toString() !== productId
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

const updateCartQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { productId, quantity } = req.body;

    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    if (quantity > product.stock) {
      res.status(400).json({ message: `Only ${product.stock} items in stock` });
      return;
    }

    const cart = (await CartModel.findOne({ userId: user!._id })) as Cart;
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      (item: CartItem) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      throw new NotFoundError("Product not found in cart");
    }
  } catch (e) {
    next(e);
  }
};

export { addToCart, getCart, removeFromCart, updateCartQuantity };
