import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  refreshAccessToken,
  signup,
} from "../controllers/user.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refresh-token", refreshAccessToken);
authRouter.get("/profile", protectedRoute, getProfile);
export default authRouter;
