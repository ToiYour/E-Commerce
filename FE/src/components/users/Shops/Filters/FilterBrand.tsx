import { getBrandProducts } from "@/api/products";
import LoadingFixed from "@/components/LoadingFixed";
import { ToastError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const FilterBrand = () => {
  const {
    data: listBrand,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["GET_FILTER_BRANDS"],
    queryFn: async () => {
      const { data } = await getBrandProducts();
      return data?.data;
    },
  });
  if (isLoading) {
    return <LoadingFixed />;
  }
  if (isError) {
    ToastError("Sảy ra lỗi khi lấy danh sách thương hiệu!");
  }
  return (
    <div className="filter-brand pb-8 mt-8">
      <div className="heading6">Thương hiệu</div>
      <div className="list-brand mt-4">
        {listBrand?.map((brand: string) => (
          <div
            key={brand}
            className="brand-item flex items-center justify-between"
          >
            <div className="left flex items-center cursor-pointer">
              <div className="block-input">
                <input type="checkbox" id={brand} />
                <i className="ph-fill ph-check-square icon-checkbox text-2xl" />
              </div>
              <label
                htmlFor={brand}
                className="brand-name capitalize pl-2 cursor-pointer"
              >
                {brand}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBrand;
