import LoadingFixed from "@/components/LoadingFixed";
import { IColor } from "@/interfaces/color";
import { cn, ToastError } from "@/lib/utils";
import { getComboboxColors } from "@/services/variants/color";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FilterColor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isColorId = searchParams.get("color");
  useEffect(() => {
    const checked = document.querySelector(
      '.filter-color input[name="filterColor"]:checked'
    ) as HTMLInputElement;
    if (checked && !isColorId) {
      checked.checked = false;
    }
  }, [searchParams.get("category")]);
  const {
    data: colors,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["GET_FILTER_COLORS"],
    queryFn: async () => {
      const { data } = await getComboboxColors();
      return data?.data;
    },
  });
  if (isLoading) {
    return <LoadingFixed />;
  }
  if (isError) {
    ToastError("Sảy ra lỗi khi lấy danh sách màu!");
  }
  const handleFilterColor = (id: string) => {
    let queryParams = { page: "1" };
    for (const [key, value] of searchParams.entries()) {
      queryParams = { ...queryParams, [key]: value };
    }
    setSearchParams({ ...queryParams, color: id as string });
  };
  return (
    <div className="filter-color pb-8 border-b border-line mt-8">
      <div className="heading6">Màu sắc</div>
      <div className=" flex items-center flex-wrap gap-3 gap-y-4 mt-4">
        {colors?.map(
          (color: IColor) =>
            color.status && (
              <label
                htmlFor={color?._id}
                key={color._id}
                className={cn(
                  " border has-[:checked]:border-red-500 has-[:checked]:text-red-500 has-[:checked]:bg-red-500/5 px-3 py-[5px] flex items-center justify-center gap-2 rounded-full   cursor-pointer"
                )}
              >
                <input
                  onChange={(e) => handleFilterColor(e.target.value as string)}
                  hidden
                  type="radio"
                  id={color?._id}
                  name="filterColor"
                  value={color._id}
                  defaultChecked={color?._id == isColorId}
                />
                <div
                  style={{ backgroundColor: color.hex }}
                  className={`color shadow-md w-5 h-5 rounded-full`}
                />
                <div className="caption1 capitalize">{color.name}</div>
              </label>
            )
        )}
      </div>
    </div>
  );
};

export default FilterColor;
