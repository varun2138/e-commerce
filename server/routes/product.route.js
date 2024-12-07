import { Router } from "express";
import { adminRoute, protectedRoute } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProducts,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get("/", protectedRoute, adminRoute, getAllProducts);
productRouter.get("/featured", getFeaturedProducts);
productRouter.get("/recommendations", getRecommendedProducts);
productRouter.post("/", protectedRoute, adminRoute, createProduct);
productRouter.delete("/:id", protectedRoute, adminRoute, deleteProduct);
productRouter.get("/category/:category", getProductsByCategory);
productRouter.patch("/:id", protectedRoute, adminRoute, toggleFeaturedProducts);
export default productRouter;
