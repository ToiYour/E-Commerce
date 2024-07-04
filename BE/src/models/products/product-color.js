import mongoose from "mongoose";
const ProductColorShema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.ObjectId, ref: "Product" },
    colorId: { type: mongoose.Schema.ObjectId, ref: "Color" },
    price: Number,
  },
  { timestamps: true }
);
export default mongoose.model("ProductColor", ProductColorShema);
