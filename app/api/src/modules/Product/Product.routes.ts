import { Router } from "express";
import {
  getProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./Product.controller";
import { authJwt } from "../../middleware/auth/authMiddleware"; // Assuming you have this middleware for JWT authentication

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductDetail);
router.post("/", authJwt, createProduct); // Protected route
router.put("/:id", authJwt, updateProduct); // Protected route
router.delete("/:id", authJwt, deleteProduct); // Protected route

export default router;
