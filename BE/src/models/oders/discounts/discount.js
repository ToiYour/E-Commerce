import mongoose from "mongoose";
const DiscountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
  isPercentage: {
    type: Boolean,
    default: false,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  minOrderAmount: {
    type: Number,
    default: 0,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  maxUsagePerUser: {
    type: Number,
    default: 1,
  },
});
const DiscountModel = mongoose.model("Discount", DiscountSchema);
export default DiscountModel;
