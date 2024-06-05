import { Router } from "express";
import {
  getProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsBySeller,
} from "./Product.controller";
import { authJwt } from "../../middleware/auth/authMiddleware";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductDetail);

// Protected routes
router.post("/", authJwt, createProduct);
router.patch("/:id", authJwt, updateProduct);
router.delete("/:id", authJwt, deleteProduct);
router.get("/seller/current", authJwt, getProductsBySeller);

export default router;
