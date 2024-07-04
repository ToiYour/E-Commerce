import { Star } from "lucide-react";

type OverviewType = {
  totalScore: number;
  numberOfReviews: number;
  sold: number;
  views: number;
};
const Overview = (props: OverviewType) => {
  const totalScore = props.totalScore;
  const numberOfReviews = props.numberOfReviews;
  let averageRating = 0;

  if (numberOfReviews > 0) {
    averageRating = parseFloat((totalScore / numberOfReviews).toFixed(1));
  }
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          fill={i <= rating ? "#ee4d2d" : "#dfdedd"}
          strokeWidth={0}
          size={16}
        />
      );
    }
    return stars;
  };
  return (
    <div className="flex items-center  ">
      <div className="rate flex items-center pr-5">
        <span className="font-medium text-sm text-[#ee4d2d] border-b border-[#ee4d2d] mr-1">
          {averageRating || ""}
        </span>
        {renderStars(averageRating)}
      </div>
      {/*  */}
      <div className="text-xs capitalize text-gray-500 px-5 border-r border-l border-gray-300">
        <span className="text-black border-b border-black">
          {numberOfReviews}
        </span>{" "}
        Đánh giá
      </div>
      <div className="text-xs capitalize text-gray-500 px-5 border-r  border-gray-300">
        <span className="text-black ">{props.sold}</span> Đã bán
      </div>
      <div className="text-xs capitalize text-gray-500 px-5 ">
        <span className="text-black ">{props.views}</span> Lượt xem
      </div>
    </div>
  );
};

export default Overview;
