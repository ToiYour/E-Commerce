import { getAllSize } from "@/api/variants/size";
import LoadingFixed from "@/components/LoadingFixed";
import { ISize } from "@/interfaces/size";
import { ToastError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const FilterSize = () => {
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
  return (
    <div className="filter-size pb-8 border-b border-line mt-8">
      <div className="heading6">Size</div>
      <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
        {listSize?.map((size: ISize) => (
          <div
            key={size._id}
            className="size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-line"
          >
            {size.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSize;
