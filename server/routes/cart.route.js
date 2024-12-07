import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  getcartProducts,
  removeAllFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";

const cartRouter = Router();
cartRouter.get("/", protectedRoute, getcartProducts);
cartRouter.post("/", protectedRoute, addToCart);
cartRouter.put("/:id", protectedRoute, updateQuantity);
cartRouter.delete("/", protectedRoute, removeAllFromCart);

export default cartRouter;
