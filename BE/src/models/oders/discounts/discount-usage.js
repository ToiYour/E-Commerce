import mongoose from "mongoose";
const DiscountUsageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  discountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discount",
    required: true,
  },
  usageCount: {
    type: Number,
    required: true,
    default: 0,
  },
});
const DiscountUsageModel = mongoose.model("DiscountUsage", DiscountUsageSchema);
export default DiscountUsageModel;
