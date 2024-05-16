import { memo } from "react";
import FilterBrand from "./Filters/FilterBrand";
import FilterColor from "./Filters/FilterColor";
import FilterPrice from "./Filters/FilterPrice";
import FilterSize from "./Filters/FilterSize";
import FilterType from "./Filters/FilterType";

const Sidebar = () => {
  return (
    <div className="sidebar lg:w-1/4 md:w-1/3 w-full md:pr-12">
      <FilterType />
      <FilterSize />
      <FilterPrice />
      <FilterColor />
      <FilterBrand />
    </div>
  );
};

export default memo(Sidebar);
