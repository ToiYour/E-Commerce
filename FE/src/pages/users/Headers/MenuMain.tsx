import LoadingFixed from "@/components/LoadingFixed";
import { ICategory } from "@/interfaces/category";
import { getComboboxCategory } from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { Link, NavLink } from "react-router-dom";

const MenuMain = () => {
  const { data: categorys, isLoading } = useQuery<ICategory[]>({
    queryKey: ["GET_CATEGORYS_HOME"],
    queryFn: async () => {
      const { data } = await getComboboxCategory();
      return data.data as ICategory[];
    },
  });
  if (isLoading) {
    return <LoadingFixed />;
  }
  return (
    <div className="menu-main h-full max-lg:hidden">
      <ul className="flex items-center gap-8 h-full">
        <li className="h-full relative">
          <NavLink
            to={"/"}
            end
            className="text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 "
          >
            Trang chủ
          </NavLink>
        </li>
        <li className="h-full relative">
          <NavLink
            to={"/shop"}
            className="text-button-uppercase duration-300 h-full flex items-center justify-center"
          >
            Sản phẩm
          </NavLink>
          <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
            <ul className="w-full">
              {categorys?.map(
                (category) =>
                  category.status && (
                    <li key={category._id}>
                      <Link
                        to={"/shop?category=" + category.slug}
                        className="link text-gray-500 duration-300"
                      >
                        {category.name}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MenuMain;
