import { Router } from "express";
import { authJwt, authLocal } from "../../middleware/auth/authMiddleware";
import { getUsers, login, updateUser } from "./User.controller";
import { register } from "./User.controller";
import passport from "passport";
///public routes
const router = Router();
router.post("/login", authLocal, login);
router.post("/register", register);
//show all users
router.get("/users", getUsers);

export default router;
