import { Express, Router } from "express";
import userPublicRoutes from "../modules/User/User.public.routes";
import userPrivateRoutes from "../modules/User/User.private.routes";
import productRoutes from "../modules/Product/Product.routes";
import messageRoutes from "../modules/Message/Message.routes";
import favoriteRoutes from "../modules/Favorite/Favorite.routes";
import cartRoutes from "../modules/Cart/Cart.routes";
import { errorHandler } from "../middleware/error/errorHandlerMiddleware";
import { authJwt } from "../middleware/auth/authMiddleware";
import orderRoutes from "../modules/Order/Order.routes";

const registerRoutes = (app: Express) => {
  app.use("/products", productRoutes);
  app.use("/", userPublicRoutes);

  const authRoutes = Router();

  app.use(authJwt, authRoutes);
  authRoutes.use("/messages", messageRoutes);
  authRoutes.use("/favorites", favoriteRoutes);
  authRoutes.use("/cart", cartRoutes);
  authRoutes.use("/orders", orderRoutes);

  authRoutes.use("/", userPrivateRoutes);

  // Should be placed AFTER all routes!
  app.use(errorHandler);
};

export { registerRoutes };
