import mongoose from "mongoose";
const ProductSizeShema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.ObjectId, ref: "Product" },
    sizeId: { type: mongoose.Schema.ObjectId, ref: "Size" },
    price: Number,
  },
  { timestamps: true }
);
export default mongoose.model("ProductSize", ProductSizeShema);
