import express from "express";

import { authenticate } from "../middleware/auth.js";
import {
  addToCart,
  getCartCheckoutByItemIds,
  getMyShoppingCart,
  removeItemsFromCart,
  updateQuantityItemCart,
  updateVariantItemCart,
} from "../controllers/cart.js";
const router = express.Router();
router.post("/addToCart", authenticate, addToCart);
router.get("/myShoppingCart", authenticate, getMyShoppingCart);
router.patch("/updateQuantityItemCart", authenticate, updateQuantityItemCart);
router.patch("/updateVariantItemCart", authenticate, updateVariantItemCart);
router.get("/checkout", authenticate, getCartCheckoutByItemIds);
router.delete("/removeItemsCart", authenticate, removeItemsFromCart);
export default router;
