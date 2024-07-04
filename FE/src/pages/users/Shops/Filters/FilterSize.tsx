import LoadingFixed from "@/components/LoadingFixed";
import { ISize } from "@/interfaces/size";
import { ToastError } from "@/lib/utils";
import { getComboboxSizes } from "@/services/variants/size";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSize = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const sizeId = searchParams.get("size");
    const checked = document.querySelector(
      '.filter-size input[name="FilterSize"]:checked'
    ) as HTMLInputElement;
    if (checked && !sizeId) {
      checked.checked = false;
    }
  }, [searchParams.get("category")]);
  const {
    data: listSize,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["GET_FILTER_SIZES"],
    queryFn: async () => {
      const { data } = await getComboboxSizes();
      return data?.data;
    },
  });
  if (isLoading) {
    return <LoadingFixed />;
  }
  if (isError) {
    ToastError("Sảy ra lỗi khi lấy danh sách size!");
  }
  const handleFilterSize = (id: string) => {
    let queryParams = { page: "1" };
    for (const [key, value] of searchParams.entries()) {
      queryParams = { ...queryParams, [key]: value };
    }
    setSearchParams({ ...queryParams, size: id as string });
  };
  return (
    <div className="filter-size pb-8 border-b border-line mt-8">
      <div className="heading6">Size</div>
      <div className="flex items-center flex-wrap gap-3 gap-y-4 mt-4">
        {listSize?.map(
          (size: ISize) =>
            size.status && (
              <label
                key={size._id}
                htmlFor={size?._id}
                className={
                  "has-[:checked]:border-red-500 has-[:checked]:text-red-500 has-[:checked]:bg-red-500/5 size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border "
                }
              >
                {size.name}
                <input
                  onChange={(e) => handleFilterSize(e.target.value as string)}
                  id={size?._id}
                  hidden
                  type="radio"
                  name="FilterSize"
                  value={size?._id}
                />
              </label>
            )
        )}
      </div>
    </div>
  );
};

export default FilterSize;
