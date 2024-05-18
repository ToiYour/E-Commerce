import { getBrandProducts } from "@/api/products";
import LoadingFixed from "@/components/LoadingFixed";
import { ToastError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const FilterBrand = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
  const handleChangeFilterBrand = () => {
    const listBrandChecked = document.querySelectorAll(
      ".filter-brand .brand-item input:checked"
    ) as NodeListOf<HTMLInputElement>;
    const listBrandId: string[] = [];
    listBrandChecked.forEach((item) => {
      listBrandId.push(item.value);
    });
    let queryParams: { [key: string]: string } = { page: "1" };
    for (const [key, value] of searchParams.entries()) {
      queryParams = { ...queryParams, [key]: value };
    }
    console.log(listBrandId);

    if (listBrandId?.length != 0) {
      setSearchParams({ ...queryParams, brand: listBrandId.join(",") });
    } else {
      delete queryParams.brand;
      setSearchParams({ ...queryParams });
    }
  };
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
                <input
                  onChange={handleChangeFilterBrand}
                  type="checkbox"
                  id={brand}
                  name="brand"
                  value={brand}
                  className="size-4 rounded border-gray-300"
                />
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
