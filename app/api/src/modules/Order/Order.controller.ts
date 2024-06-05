import { Request, Response, NextFunction } from "express";
import Order from "./Order.model";
import { AuthRequest } from "../../middleware/auth/authMiddleware";
import NotFoundError from "../../middleware/error/NotFoundError";
import CartModel from "../Cart/Cart.model";
import OrderModel from "./Order.model";
import ProductModel from "../Product/Product.model";

const getOrdersForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;

    let orders;

    if (user?.role === "seller") {
      const products = await ProductModel.find({ sellerId: user._id }).select(
        "_id"
      );
      const productIds = products.map((product) => product._id);

      orders = await OrderModel.find({
        "products.productId": { $in: productIds },
      })
        .populate("userId", "name email")
        .populate({
          path: "products.productId",
          select: "name price",
        });
    } else {
      orders = await OrderModel.find({ userId: user?._id }).populate(
        "products.productId",
        "name price"
      );
    }

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const placeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;

    console.log("Fetching cart for user:", user?._id);
    const cart = await CartModel.findOne({ userId: user?._id }).populate(
      "items.productId"
    );

    if (!cart) {
      console.error("Cart not found for user:", user?._id);
      throw new NotFoundError("Cart not found");
    }

    // Filter out cart items with null productId
    const validCartItems = cart.items.filter((item) => item.productId);

    if (validCartItems.length === 0) {
      throw new NotFoundError("No valid products in cart to place order");
    }

    console.log("Creating order for cart:", cart);
    const order = new Order({
      userId: cart.userId,
      products: validCartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      total: validCartItems.reduce(
        (acc, item) => acc + (item.productId as any).price * item.quantity,
        0
      ),
      status: "ordered",
    });

    console.log("Saving order:", order);
    await order.save();

    // Clear the cart after placing the order
    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    next(error);
  }
};

export { placeOrder, getOrdersForUser };
