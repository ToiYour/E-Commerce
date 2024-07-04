import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ["cash_on_delivery", "momo_e_wallet", "zalo_e_wallet", "vnpay_bank"],
    required: true,
    default: "cash_on_delivery",
  },
  amount: {
    type: Number,
    required: true,
  },
  desc: String,
});
export default PaymentSchema;
