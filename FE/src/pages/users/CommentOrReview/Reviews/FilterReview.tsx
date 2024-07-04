import React from "react";
import { useSearchParams } from "react-router-dom";
type FilterReviewType = {
  summary?: {
    1?: number;
    2?: number;
    3?: number;
    4?: number;
    5?: number;
    isImage?: number;
    isReview?: number;
  };
};
const FilterReview = ({ summary }: FilterReviewType) => {
  const filterOptions = [
    { id: "all", label: "Tất cả", count: null, type: "", value: "" },
    {
      id: "5rate",
      label: "5 sao",
      count: summary?.[5] || "",
      type: 5,
      value: "rating",
    },
    {
      id: "4rate",
      label: "4 sao",
      count: summary?.[4] || "",
      type: 4,
      value: "rating",
    },
    {
      id: "3rate",
      label: "3 sao",
      count: summary?.[3] || "",
      type: 3,
      value: "rating",
    },
    {
      id: "2rate",
      label: "2 sao",
      count: summary?.[2] || "",
      type: 2,
      value: "rating",
    },
    {
      id: "1rate",
      label: "1 sao",
      count: summary?.[1] || "",
      type: 1,
      value: "rating",
    },
    {
      id: "isReview",
      label: "Có bình luận",
      count: summary?.isReview || "",
      type: "nonempty",
      value: "review",
    },
    {
      id: "isImage",
      label: "Có hình ảnh",
      count: summary?.isImage || "",
      type: "empty",
      value: "images",
    },
  ];
  const [, setSeachParams] = useSearchParams();
  return (
    <div className="w-full ">
      <ul className=" flex items-center gap-3 py-2 px-4 whitespace-nowrap">
        {filterOptions.map((option) => (
          <li
            key={option.id}
            className="flex items-center gap-2 py-1.5 px-3.5 border border-gray-200 rounded cursor-pointer capitalize transition-colors duration-200 ease-in-out has-[:checked]:border-[#ee4d2d] has-[:checked]:fill-[#ee4d2d] has-[:checked]:text-[#ee4d2d]"
          >
            <label htmlFor={option.id} className="cursor-pointer">
              {option.label} {option.count ? `(${option.count})` : ""}
            </label>
            <input
              onChange={(e) => {
                if (e.target.value === "") {
                  setSeachParams({});
                } else {
                  setSeachParams({
                    field: e.target.value,
                    type: `${option.type}`,
                  });
                }
              }}
              hidden
              value={option.value}
              type="radio"
              name="rating__filters"
              id={option.id}
              defaultChecked={option.id === "all"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterReview;
