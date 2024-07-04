import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  createReviews,
  getAllReviews,
  getReviewsByProductSlug,
  likedProductReviews,
  removeProductReviewsById,
} from "../controllers/reviews.js";
const router = express.Router();
router.post("/feedback", authenticate, createReviews);
router.get("/:slug/bySlugProduct", getReviewsByProductSlug);
router.post("/likedOrUnliked", authenticate, likedProductReviews);
router.delete("/:reviewId/removeByIdReview", removeProductReviewsById);
router.get("/", getAllReviews);
export default router;
