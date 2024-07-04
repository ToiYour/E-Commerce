import mongoose from "mongoose";
const CartItemShema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    selectedVariant: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Variant",
    },
  },
  {
    timestamps: true,
  }
);
export default CartItemShema;
