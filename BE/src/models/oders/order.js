import mongoose from "mongoose";
import OrderItemSchema from "./order-item.js";
import PaymentSchema from "./payment.js";
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
    },
    orderItems: [OrderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    recipientName: String,
    recipientPhone: String,
    payment: PaymentSchema,
    address: {
      province: String,
      district: String,
      commune: String,
      specific: String,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "confirmed",
    },
    statusHistory: [
      {
        status: {
          type: String,
          enum: [
            "pending",
            "confirmed",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
          ],
          default: "pending",
        },
        date: {
          type: Date,
          default: Date.now,
          required: true,
        },
      },
    ],
    discountId: {
      type: mongoose.Types.ObjectId,
      ref: "Discount",
    },
    finalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    noteMessage: {
      type: String,
    },
    isEvaluating: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
