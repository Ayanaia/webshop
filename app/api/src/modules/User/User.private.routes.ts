import { Router } from "express";
import { authJwt } from "../../middleware/auth/authMiddleware";
import { requireSellerRole } from "../../middleware/auth/roleMiddleware";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../Product/Product.controller";
import { getCurrentUser, updateUser } from "./User.controller";

const router = Router();

// Private routes for sellers only
router.get("/users/current", authJwt, getCurrentUser);
router.post("/products", authJwt, createProduct);
router.patch("/products/:id", authJwt, updateProduct);
//update user
router.patch("/users/:id", authJwt, updateUser);
router.delete("/products/:id", authJwt, deleteProduct);

export default router;
