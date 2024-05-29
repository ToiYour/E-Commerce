import { Star } from "lucide-react";
import React from "react";

const ItemReview = () => {
  return (
    <div className="item flex flex-col  gap-y-2 w-full py-6 border-b border-line">
      <div className="left ">
        <div className="user mt-3">
          <div className="text-title">Tony Nguyen</div>
          <div className="flex items-center gap-2 text-xs text-[#0000008a]">
            <div className="text-gray-500">2024-04-25 10:28</div>
            <div className="text-gray-500">|</div>
            <div className="text-gray-500 flex">
              Phân loại hàng:
              <span>Yellow</span> , <span>XL</span>
            </div>
          </div>
        </div>
      </div>
      <div className="right ">
        <div className="rate flex">
          <Star fill="#ecb018" strokeWidth={0} size={16} />
          <Star fill="#ecb018" strokeWidth={0} size={16} />
          <Star fill="#ecb018" strokeWidth={0} size={16} />
          <Star fill="#ecb018" strokeWidth={0} size={16} />
          <Star fill="#dfdedd" strokeWidth={0} size={16} />
        </div>
        <div className="body1 text-sm">
          Tôi không thể có đủ những món đồ thời trang từ thương hiệu này. Họ có
          một lựa chọn tuyệt vời cho mọi dịp và giá cả hợp lý. Các vận chuyển
          nhanh chóng và các mặt hàng luôn đến trong tình trạng hoàn hảo.
        </div>
        <div className="list-img-review flex gap-2 mt-2">
          <img
            src="/images/sale1.jpg"
            alt="img"
            className="w-[60px] aspect-square rounded-lg"
          />
          <img
            src="/images/sale1.jpg"
            alt="img"
            className="w-[60px] aspect-square rounded-lg"
          />
          <img
            src="/images/sale1.jpg"
            alt="img"
            className="w-[60px] aspect-square rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemReview;
