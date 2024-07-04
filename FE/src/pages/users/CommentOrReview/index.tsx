import { cn } from "@/lib/utils";
import { useState } from "react";
import Comment from "./Comments/Comment";
import Reviews from "./Reviews/Review";

const CommentOrReviews = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="container max-w-7xl bg-white py-10 px-5">
      <div className="flex items-center justify-center gap-3 mb-5 text-lg font-medium *:uppercase *:cursor-pointer">
        <h2
          onClick={() => setActiveTab(1)}
          className={cn(activeTab == 1 && "text-red-500")}
        >
          Bình luận{" "}
        </h2>
        <span>|</span>
        <h2
          onClick={() => setActiveTab(2)}
          className={cn(activeTab == 2 && "text-red-500")}
        >
          ĐÁNH giá sản phẩm
        </h2>
      </div>
      {activeTab === 1 && <Comment />}
      {activeTab === 2 && <Reviews />}
    </div>
  );
};

export default CommentOrReviews;
