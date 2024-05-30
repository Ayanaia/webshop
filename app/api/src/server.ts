import "dotenv/config";
import mongoose from "mongoose";
import { Express } from "express";
import { Server } from "http";
import app from "./app";
import productRoutes from "./modules/Product/Product.routes";
import favoriteRoutes from "./modules/Favorite/Favorite.routes";
import cartRoutes from "./modules/Cart/Cart.routes";
import messageRoutes from "./modules/Message/Message.routes";
import userRoutes from "./modules/User/User.public.routes";

const port: number = parseInt(process.env.PORT ?? "3002");

if (process.env.MONGO_CONNECTION) {
  mongoose
    .connect(process.env.MONGO_CONNECTION)
    .then(() => {
      console.log("Connected to MongoDB");
      const server = app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
      });

      process.on("SIGINT", () => stopServer(server));
      process.on("SIGTERM", () => stopServer(server));
    })
    .catch((error) => console.error(error));
} else {
  throw new Error("No MongoDB connection string");
}

// Register routes
app.use("/products", productRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/cart", cartRoutes);
app.use("/messages", messageRoutes);
app.use("/", userRoutes);

const stopServer = (server: Server) => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};
