import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import routerCategory from "./src/routes/category.js";
import routerColor from "./src/routes/color.js";
import routerAuth from "./src/routes/customer.js";
import routerProduct from "./src/routes/product.js";
import routerSize from "./src/routes/size.js";
import routerVariant from "./src/routes/variant.js";
dotenv.config();
// Kết nối MongoDB
mongoose
  .connect(process.env.URI_MONGODB || "mongodb://127.0.0.1:27017/e-commerce")
  .then(() => {
    console.log("Connect MongoDB Successfully");
  })
  .catch(() => {
    console.log("Connect MongoDB False");
  });
// Routes
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/color", routerColor);
app.use("/api/size", routerSize);
app.use("/api/category", routerCategory);
app.use("/api/variant", routerVariant);
app.use("/api/product", routerProduct);
app.use("/api/auth", routerAuth);
app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on port 4000`);
});
