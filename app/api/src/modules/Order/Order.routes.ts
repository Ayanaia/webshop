import { Router } from "express";
import { authJwt } from "../../middleware/auth/authMiddleware";
import { getOrdersForUser, placeOrder } from "./Order.controller";

const router = Router();

router.post("/place-order", authJwt, placeOrder);
router.get("/", authJwt, getOrdersForUser);

export default router;
