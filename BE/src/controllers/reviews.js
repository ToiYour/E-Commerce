import OrderModel from "../models/oders/order.js";
import ProductModel from "../models/products/product.js";
import ReviewsModel from "../models/review.js";

export const createReviews = async (req, res) => {
  try {
    const { starNumber, review, images, purchasedProduct, orderId } = req.body;
    const promises = purchasedProduct.map(async (product) => {
      const payload = {
        userId: req.user._id,
        productId: product.productId,
        selectedVariant: product.selectedVariant,
        review,
        rating: starNumber,
        images,
      };

      await ReviewsModel.create(payload);

      // cập nhật đánh giá trung bình của sản phẩm
      await ProductModel.findByIdAndUpdate(product.productId, {
        $inc: {
          "averageRating.totalScore": starNumber,
          "averageRating.numberOfReviews": 1,
        },
      });
    });

    const data = await Promise.all(promises);
    await OrderModel.findByIdAndUpdate(orderId, { isEvaluating: true });
    return res.send({
      message: "Cảm ơn bạn đã dành thời gian để đánh giá sản phẩm.",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const getReviewsByProductSlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { type, field } = req.query;

    const product = await ProductModel.findOne({ slug });

    if (!product) {
      return res.status(404).send({ message: "Không tìm thấy sản phẩm" });
    }
    let query = { productId: product._id };
    if (type && field) {
      if (field === "review" || field === "images") {
        if (type === "empty") {
          query[field] = { $ne: [] };
        } else if (type === "nonempty") {
          query[field] = { $ne: "" };
        } else {
          query[field] = { $ne: type };
        }
      } else {
        query[field] = type;
      }
    }
    const reviews = await ReviewsModel.find({ productId: product._id });
    const summaryRate = reviews.reduce(
      (acc, review) => {
        const { rating, review: reviewText, images } = review;
        if (rating >= 1 && rating <= 5) {
          acc[rating]++;
        }
        if (reviewText && reviewText.trim() !== "") {
          acc.isReview++;
        }
        if (images && images.length > 0) {
          acc.isImage++;
        }
        return acc;
      },
      {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        isReview: 0,
        isImage: 0,
      }
    );
    const data = await ReviewsModel.find(query)
      .populate("productId userId")
      .populate({
        path: "selectedVariant",
        populate: ["colorId", "sizeId"],
      });
    return res.send({
      message: "Get reviews successfully",
      data: {
        reviews: data,
        summaryRate,
        averageRating: parseFloat(
          (
            product?.averageRating?.totalScore /
            product?.averageRating?.numberOfReviews
          ).toFixed(1)
        ),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const likedProductReviews = async (req, res) => {
  try {
    const { reviewId } = req.body;
    if (!reviewId) {
      return res.status(400).send({ message: "Bạn chưa nhập Id đánh giá" });
    }
    const review = await ReviewsModel.findById(reviewId);
    const isLiked = review.likes.indexOf(req.user._id);
    if (isLiked != -1) {
      review.likes.splice(isLiked, 1);
    } else {
      review.likes.push(req.user._id);
    }
    await review.save();
    return res.send({ message: "Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const removeProductReviewsById = async (req, res) => {
  try {
    const { reviewId } = req.params;
    if (!reviewId) {
      return res.status(400).send({ message: "Bạn chưa nhập Id đánh giá" });
    }
    const data = await ReviewsModel.findByIdAndDelete(reviewId);
    await ProductModel.findByIdAndUpdate(data?.productId?.toString(), {
      $inc: {
        "averageRating.totalScore": -data?.rating || 0,
        "averageRating.numberOfReviews": -1,
      },
    });
    return res.send({ message: "Đã xoá đánh giá", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const getAllReviews = async (req, res) => {
  try {
    const { type, field } = req.query;
    let query = {};
    if (type && field) {
      if (field === "review" || field === "images") {
        if (type === "empty") {
          query[field] = { $ne: [] };
        } else if (type === "nonempty") {
          query[field] = { $ne: "" };
        } else {
          query[field] = { $ne: type };
        }
      } else {
        query[field] = type;
      }
    }
    const data = await ReviewsModel.find(query).populate([
      "userId",
      "productId",
      "selectedVariant",
    ]);
    return res.send({ message: "Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
