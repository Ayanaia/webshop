import { Router } from "express";
import { authJwt } from "../../middleware/auth/authMiddleware";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
} from "./Cart.controller";

const router = Router();

router.get("/", authJwt, getCart);
router.post("/", authJwt, addToCart);
router.delete("/:productId", authJwt, removeFromCart);
router.put("/update-quantity", authJwt, updateCartQuantity);

export default router;
