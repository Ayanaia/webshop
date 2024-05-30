import { Router } from "express";
import { authJwt } from "../../middleware/auth/authMiddleware";
import { getCart, addToCart, removeFromCart } from "./Cart.controller";

const router = Router();

router.get("/cart", authJwt, getCart);
router.post("/cart", authJwt, addToCart);
router.delete("/cart/:productId", authJwt, removeFromCart);

export default router;
