import instance from "@/config/instance";
type createProductReviewsType = {
  orderId: string;
  starNumber: number;
  review: string;
  images: string[];
  purchasedProduct: [
    {
      productId: string;
      selectedVariant: string;
    }
  ];
};
export const createProductReviews = (data: createProductReviewsType) => {
  const uri = "/reviews/feedback";
  return instance.post(uri, data);
};
export const getProductReviews = (slug: string, query?: string) => {
  const uri = `/reviews/${slug}/bySlugProduct` + query || "";
  return instance.get(uri);
};
export const likedOrUnLikedProductReviews = (reviewId: string) => {
  const uri = `/reviews/likedOrUnliked`;
  return instance.post(uri, { reviewId });
};
export const removeByIdReviews = (reviewId: string) => {
  const uri = `/reviews/${reviewId}/removeByIdReview`;
  return instance.delete(uri);
};
export const getAllReviews = (col?: string, type?: string) => {
  const query = col && type ? `?field=${col}&type=${type}` : "";
  const uri = `/reviews${query}`;
  return instance.get(uri);
};
