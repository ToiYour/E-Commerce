import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import routerCategory from "./src/routes/category.js";
import routerColor from "./src/routes/color.js";
import routerCustomer from "./src/routes/customer.js";
import routerProduct from "./src/routes/product.js";
import routerSize from "./src/routes/size.js";
import routerVariant from "./src/routes/variant.js";
import routerAuth from "./src/routes/auth.js";
import cookieParser from "cookie-parser";
dotenv.config();
// Kết nối MongoDB
mongoose
  .connect(process.env.URI_MONGODB)
  .then(() => {
    console.log("Connect MongoDB Successfully");
  })
  .catch(() => {
    console.log("Connect MongoDB False");
  });
// Routes
const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use("/api/color", routerColor);
app.use("/api/size", routerSize);
app.use("/api/category", routerCategory);
app.use("/api/variant", routerVariant);
app.use("/api/product", routerProduct);
app.use("/api/customer", routerCustomer);
app.use("/api/auth", routerAuth);
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
