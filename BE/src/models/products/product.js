import mongoose from "mongoose";
const ProductShema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String,
    ablum: Array,
  },
  { timestamps: true }
);
export default mongoose.model("Product", ProductShema);
