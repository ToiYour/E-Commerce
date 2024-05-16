import { ChangeEventHandler, memo } from "react";
import { useSearchParams } from "react-router-dom";

const FilterHeading = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSortHeader: ChangeEventHandler<HTMLSelectElement> = (e) => {
    let queryParams = { page: "1" };
    for (const [key, value] of searchParams.entries()) {
      queryParams = { ...queryParams, [key]: value };
    }
    switch (e.target.value) {
      case "soldQuantityHighToLow":
        break;
      case "discountHighToLow":
        break;
      case "priceHighToLow":
        setSearchParams({ ...queryParams, arrange: "price", orderBy: "desc" });
        break;
      case "priceLowToHigh":
        setSearchParams({ ...queryParams, arrange: "price", orderBy: "asc" });
        break;
      default:
        setSearchParams({});
        break;
    }
  };
  return (
    <div className="filter-heading flex justify-end items-center gap-5 flex-wrap">
      <div className="sort-product right flex items-center gap-3">
        <label htmlFor="select-filter" className="caption1 capitalize">
          Sắp xếp theo
        </label>
        <div className="select-block relative">
          <select
            onChange={handleSortHeader}
            id="select-filter"
            name="select-filter"
            className="caption1 py-2 pl-3 md:pr-20 pr-10 rounded-lg border border-line"
          >
            <option value="">Mặc định</option>
            <option value="soldQuantityHighToLow">Bán chạy nhất</option>
            <option value="discountHighToLow">Giảm giá tốt nhất</option>
            <option value="priceHighToLow">Giá từ cao đến thấp</option>
            <option value="priceLowToHigh">Giá thấp đến cao</option>
          </select>
          <i className="ph ph-caret-down absolute top-1/2 -translate-y-1/2 md:right-4 right-2" />
        </div>
      </div>
    </div>
  );
};

export default memo(FilterHeading);
