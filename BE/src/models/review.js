import mongoose from "mongoose";
const ReviewsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    selectedVariant: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Variant",
    },
    review: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    images: [
      {
        type: String,
        trim: true,
        default: null,
      },
    ],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
        default: null,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const ReviewsModel = mongoose.model("Review", ReviewsSchema);
export default ReviewsModel;
