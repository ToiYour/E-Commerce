import { getAllColor } from "@/api/variants/color";
import LoadingFixed from "@/components/LoadingFixed";
import { IColor } from "@/interfaces/color";
import { ToastError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const FilterColor = () => {
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
  return (
    <div className="filter-color pb-8 border-b border-line mt-8">
      <div className="heading6">Màu sắc</div>
      <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
        {colors?.map((color: IColor) => (
          <div
            key={color._id}
            className="color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border
                                          border-line cursor-pointer"
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
