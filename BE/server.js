import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import routerColor from "./src/routes/color.js";
mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerce")
  .then(() => {
    console.log("Connect MongoDB Successfully");
  })
  .catch(() => {
    console.log("Connect MongoDB False");
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/color", routerColor);
app.listen(4000, () => {
  console.log(`Listening on port 4000`);
});
