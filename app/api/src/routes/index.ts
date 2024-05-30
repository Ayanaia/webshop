import { Express, Router } from "express";
import userPublicRoutes from "../modules/User/User.public.routes";
import userPrivateRoutes from "../modules/User/User.private.routes";
import productRoutes from "../modules/Product/Product.routes";
import messageRoutes from "../modules/Message/Message.routes";
import favoriteRoutes from "../modules/Favorite/Favorite.routes";
import cartRoutes from "../modules/Cart/Cart.routes";
import { errorHandler } from "../middleware/error/errorHandlerMiddleware";
import { authJwt } from "../middleware/auth/authMiddleware";

const registerRoutes = (app: Express) => {
  app.use("/", userPublicRoutes);

  const authRoutes = Router();
  authRoutes.use("/", userPrivateRoutes);
  authRoutes.use("/", productRoutes);
  authRoutes.use("/", messageRoutes);
  authRoutes.use("/", favoriteRoutes);
  authRoutes.use("/", cartRoutes);

  app.use(authJwt, authRoutes);

  // Should be placed AFTER all routes!
  app.use(errorHandler);
};

export { registerRoutes };
