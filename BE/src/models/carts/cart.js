import mongoose from "mongoose";
import CartItemShema from "./cart-item.js";
const CartShema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    items: [CartItemShema],
    totalPrice: { type: Number, required: true, default: 0 },
    totalQuantity: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);
CartShema.pre("save", async function (next) {
  const cart = this;
  let totalPrice = 0;
  let totalQuantity = 0;
  await cart.populate("items.productId");
  await cart.populate("items.selectedVariant");
  cart.items.forEach((item) => {
    let productPrice = item.productId.price; // Giá sản phẩm
    if (item.selectedVariant) {
      productPrice += item.selectedVariant.extra_price; // Giá cho biến thể sản phẩm
    }
    totalQuantity += item.quantity;
    totalPrice += productPrice * item.quantity;
  });
  cart.totalPrice = totalPrice;
  cart.totalQuantity = totalQuantity;
  next();
});
export default mongoose.model("Cart", CartShema);
