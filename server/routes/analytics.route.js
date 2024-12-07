import Router from "express";
import { protectedRoute, adminRoute } from "../middlewares/auth.middleware.js";
import { Analytics } from "../controllers/analytics.controller.js";
const analyticsRouter = Router();

analyticsRouter.get("/", protectedRoute, adminRoute, Analytics);

export default analyticsRouter;
