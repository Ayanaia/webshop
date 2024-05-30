import { Router } from "express";
import { authJwt } from "../../middleware/auth/authMiddleware";
import { requireSellerRole } from "../../middleware/auth/roleMiddleware";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../Product/Product.controller";

const router = Router();

// Private routes for sellers only
router.post("/products", authJwt, createProduct);
router.patch("/products/:id", authJwt, updateProduct);
router.delete("/products/:id", authJwt, deleteProduct);

export default router;
