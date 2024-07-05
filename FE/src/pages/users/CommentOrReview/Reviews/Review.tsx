import LoadingData from "@/components/LoadingData";
import { useAuth } from "@/hooks/auth";
import { IReviews } from "@/interfaces/reviews";
import { cn, ToastError } from "@/lib/utils";
import {
  getProductReviews,
  likedOrUnLikedProductReviews,
} from "@/services/reviews";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Star, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ActionDropDown from "./Action";
import FilterReview from "./FilterReview";
type summaryRateType = {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
  isImage?: number;
  isReview?: number;
};
const Reviews = () => {
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const QueryClient = useQueryClient();
  const { authUser } = useAuth();
  const [starSize, setStarSize] = useState(24);
  const [SeachParams] = useSearchParams();
  const field = SeachParams.get("field");
  const type = SeachParams.get("type");
  const { data, isLoading } = useQuery<{
    reviews: IReviews[];
    summaryRate?: summaryRateType;
    averageRating: number;
  }>({
    queryKey: ["GET_PRODUCT_REVIEWS_BY_SLUG", field, type],
    queryFn: async () => {
      const query = field && type ? `?field=${field}&type=${type}` : "";
      const { data } = await getProductReviews(slug as string, query);
      return data.data;
    },
  });
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setStarSize(16);
      } else {
        setStarSize(24);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const renderStars = (avg: number, size: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={size}
          className=""
          color="#ee4d2d"
          fill={i < avg ? "#ee4d2d" : "#eee"}
        />
      );
    }
    return stars;
  };
  const handleLikedOrUnliked = async (reviewId: string) => {
    try {
      setLoading(true);
      await likedOrUnLikedProductReviews(reviewId);
      QueryClient.invalidateQueries({
        queryKey: ["GET_PRODUCT_REVIEWS_BY_SLUG"],
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="uppercase">Đánh giá sản phẩm</h2>
      <div className="flex items-center gap-x-2 md:gap-x-16 bg-[#fffbf8] border border-[#f9ede5] p-7">
        <div className="flex flex-col items-center w-max">
          <p className="text-[#ee4d2d]">
            <span className="text-lg md:text-2xl font-medium ">
              {" "}
              {data?.averageRating || 0}{" "}
            </span>{" "}
            trên 5
          </p>
          <ul className="flex items-center">
            {renderStars(Math.floor(data?.averageRating || 0), starSize).map(
              (star, index) => (
                <li key={index}>{star}</li>
              )
            )}
          </ul>
        </div>
        <div className="overflow-x-auto max-w-full">
          <FilterReview summary={data?.summaryRate} />
        </div>
      </div>
      <div className="list-review">
        {isLoading ? (
          <LoadingData />
        ) : (
          data?.reviews?.map((review) => (
            <div
              key={review?._id}
              className="relative flex items-start gap-3 border-b border-gray-200 py-5"
            >
              <div className="absolute right-2 top-5">
                <ActionDropDown
                  reviewId={review?._id}
                  userId={review?.userId?._id as string}
                />
              </div>
              <div className="size-10 min-w-10 min-h-10">
                <img
                  src={review?.userId?.avatar as string}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <p>
                  {review?.userId?.name?.last_name}{" "}
                  {review?.userId?.name?.first_name}
                </p>
                <ul className="flex items-center">
                  {renderStars(Math.floor(review?.rating), 14).map(
                    (star, index) => (
                      <li key={index}>{star}</li>
                    )
                  )}
                </ul>
                <span className="text-xs text-[#0000008a]">
                  {new Date(review?.createdAt).toLocaleString()} | Phân loại
                  hàng: {review?.selectedVariant?.colorId?.name}, Size{" "}
                  {review?.selectedVariant?.sizeId?.name}
                </span>
                <p>{review?.review}</p>
                <ul
                  className={cn(
                    "flex items-center gap-2 *:size-14 min-w-14 min-h-14",
                    review?.images?.length <= 0 && "hidden"
                  )}
                >
                  {review?.images?.map((img) => (
                    <li key={img}>
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </li>
                  ))}
                </ul>
                <span
                  className={cn(
                    "flex items-start gap-0.5",
                    loading && "pointer-events-none animate-pulse"
                  )}
                  onClick={() => handleLikedOrUnliked(review?._id)}
                >
                  <ThumbsUp
                    size={16}
                    className={cn(
                      "cursor-pointer ",
                      review?.likes?.includes(authUser?._id as string) &&
                        "fill-[#ee4d2d] text-[#ee4d2d]",
                      isLoading && "animate-pulse"
                    )}
                  />

                  <span className="text-sm text-[#0000008a]">
                    {review?.likes?.length <= 0
                      ? "Hữu ích"
                      : review?.likes?.length}
                  </span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
