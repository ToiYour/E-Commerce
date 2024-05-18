import { getAllSize } from "@/api/variants/size";
import LoadingFixed from "@/components/LoadingFixed";
import { ISize } from "@/interfaces/size";
import { ToastError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { MouseEventHandler } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSize = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: listSize,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["GET_FILTER_SIZES"],
    queryFn: async () => {
      const { data } = await getAllSize("");
      return data?.data?.docs;
    },
  });
  if (isLoading) {
    return <LoadingFixed />;
  }
  if (isError) {
    ToastError("Sảy ra lỗi khi lấy danh sách size!");
  }
  const handleFilterSize: MouseEventHandler<HTMLDivElement> = (e) => {
    // Sử lý UI
    const isActiveSizeItem = document.querySelector(
      ".filter-size .list-size .size-item.active"
    ) as HTMLDivElement;
    isActiveSizeItem && isActiveSizeItem.classList.remove("active");
    const sizeItem = e.target as HTMLDivElement;
    sizeItem.classList.add("active");
    // End sử lý UI
    // Logic
    let queryParams = { page: "1" };
    for (const [key, value] of searchParams.entries()) {
      queryParams = { ...queryParams, [key]: value };
    }
    setSearchParams({ ...queryParams, size: sizeItem.dataset.id as string });
  };
  return (
    <div className="filter-size pb-8 border-b border-line mt-8">
      <div className="heading6">Size</div>
      <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
        {listSize?.map((size: ISize) => (
          <div
            onClick={handleFilterSize}
            key={size._id}
            data-id={size._id}
            className={`${
              searchParams.get("size") == size._id && "active"
            } size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-line`}
          >
            {size.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSize;
