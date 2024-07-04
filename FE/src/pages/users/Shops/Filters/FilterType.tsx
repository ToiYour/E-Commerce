import { ICategory } from "@/interfaces/category";
import { getComboboxCategory } from "@/services/category";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterType = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  const queryClient = useQueryClient();
  useEffect(() => {
    (async () => {
      const data = await queryClient.ensureQueryData({
        queryKey: ["GET_CATEGORYS_HOME"],
        queryFn: async () => {
          const { data } = await getComboboxCategory();
          return data.data as ICategory[];
        },
      });
      setCategorys(data);
    })();
  }, [queryClient]);
  const handleFindCategoryProducts = (slug: string) => {
    let queryParams = { page: "1" };
    for (const [key, value] of searchParams.entries()) {
      queryParams = { ...queryParams, [key]: value };
    }
    setSearchParams({ ...queryParams, category: slug });
  };
  return (
    <div className="filter-type-block pb-8 border-b border-line">
      <div className="heading6">Danh mục</div>
      <div className="list-type filter-type menu-tab mt-4">
        {categorys?.map(
          (category) =>
            category.status && (
              <div
                onClick={() =>
                  handleFindCategoryProducts(category.slug as string)
                }
                key={category._id}
                className={`${
                  searchParams.get("category") == category.slug ? "active" : ""
                } item tab-item flex items-center justify-between cursor-pointer `}
              >
                <div className="type-name text-gray-500 has-line-before hover:text-black capitalize">
                  {category.name}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default FilterType;
