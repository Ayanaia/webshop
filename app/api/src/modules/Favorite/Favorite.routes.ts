import { Router } from "express";
import { authJwt } from "../../middleware/auth/authMiddleware";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "./Favorite.controller";

const router = Router();

router.get("/", authJwt, getFavorites);
router.post("/", authJwt, addFavorite);
router.delete("/:id", authJwt, removeFavorite);

export default router;
