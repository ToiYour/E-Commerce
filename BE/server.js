import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import routerColor from "./src/routes/color.js";
import routerSize from "./src/routes/size.js";
import routerCategory from "./src/routes/category.js";
import routerVariant from "./src/routes/variant.js";
import routerProduct from "./src/routes/product.js";
import routerCustomer from "./src/routes/customer.js";

// Kết nối MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerce")
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
app.use("/api/customer", routerCustomer);
app.listen(4000, () => {
  console.log(`Listening on port 4000`);
});
