import { Router } from "express";
import { authJwt } from "../../middleware/auth/authMiddleware";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "./Favorite.controller";

const router = Router();

router.get("/favorites", authJwt, getFavorites);
router.post("/favorites", authJwt, addFavorite);
router.delete("/favorites/:id", authJwt, removeFavorite);

export default router;
