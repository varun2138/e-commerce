import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();
dotenv.config();

const PORT = process.env.PORT;
app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

const __dirname = path.resolve();
connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("hello");
    });
    app.listen(PORT, () => {
      console.log("app listening");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed !!!!", error.message);
  });

//   routes declaration
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import couponRouter from "./routes/coupon.route.js";
import paymentRouter from "./routes/payment.route.js";
import analyticsRouter from "./routes/analytics.route.js";

// routes initialization
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/analytics", analyticsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}
