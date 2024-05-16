import { memo } from "react";
import ItemReview from "./ItemReview";

const CustomerReview = () => {
  return (
    <div className="review-block md:py-20 py-10 bg-gray-50">
      <div className="container">
        <div className="heading flex items-center justify-between flex-wrap gap-4">
          <div className="heading4">Đánh giá sản phẩm</div>
        </div>
        <div className="list-review">
          <ItemReview />
          <div className="text-button more-review-btn text-center mt-2 underline cursor-pointer">
            Xem thêm bình luận
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomerReview);
