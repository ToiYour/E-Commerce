import { getAllColor } from "@/api/variants/color";
import LoadingFixed from "@/components/LoadingFixed";
import { IColor } from "@/interfaces/color";
import { ToastError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { MouseEventHandler } from "react";
import { useSearchParams } from "react-router-dom";

const FilterColor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: colors,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["GET_FILTER_COLORS"],
    queryFn: async () => {
      const { data } = await getAllColor("");
      return data?.data?.docs;
    },
  });
  if (isLoading) {
    return <LoadingFixed />;
  }
  if (isError) {
    ToastError("Sảy ra lỗi khi lấy danh sách màu!");
  }
  const handleFilterColor: MouseEventHandler<HTMLDivElement> = (e) => {
    // Sử lý UI
    const isActiveColorItem = document.querySelector(
      ".filter-color .list-color .color-item.active"
    ) as HTMLDivElement;
    isActiveColorItem && isActiveColorItem.classList.remove("active");
    const elementTarget = e.target as HTMLDivElement;
    const colorItem = elementTarget.closest(".color-item") as HTMLDivElement;

    colorItem.classList.add("active");
    // End sử lý UI
    // Logic

    let queryParams = { page: "1" };
    for (const [key, value] of searchParams.entries()) {
      queryParams = { ...queryParams, [key]: value };
    }
    setSearchParams({ ...queryParams, color: colorItem.dataset.id as string });
  };
  return (
    <div className="filter-color pb-8 border-b border-line mt-8">
      <div className="heading6">Màu sắc</div>
      <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
        {colors?.map((color: IColor) => (
          <div
            onClick={handleFilterColor}
            key={color._id}
            data-id={color._id}
            className={`${
              searchParams.get("color") == color._id && "active"
            } color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border
                                          border-line cursor-pointer`}
          >
            <div
              style={{ backgroundColor: color.hex }}
              className={`color shadow-md w-5 h-5 rounded-full`}
            />
            <div className="caption1 capitalize">{color.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterColor;
