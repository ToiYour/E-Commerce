import { getBySlugCategory } from "@/api/categorys";
import Breadcrumd from "@/pages/users/Breadcrumd";
import FilterHeading from "@/pages/users/Shops/Filters/FilterHeading";
import ProductList from "@/pages/users/Shops/Products/ProductList";
import Sidebar from "@/pages/users/Shops/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
const ShopPage = () => {
  const [queryParams] = useSearchParams();

  const breadcrumbs = {
    info: [{ title: "Trang chủ", urlLink: "/" }],

    page: "Sản phẩm",
  };
  const { data } = useQuery({
    queryKey: ["GET_BREADCURMD_SHOP_PAGE", queryParams.get("category")],
    queryFn: async () => {
      if (queryParams.get("category")) {
        const { data } = await getBySlugCategory(
          queryParams.get("category") as string
        );
        return data.data;
      } else {
        return null;
      }
    },
  });
  if (data) {
    breadcrumbs.info.push({
      title: "Sản phẩm",
      urlLink: `/shop`,
    });
    breadcrumbs.page = data.name;
  }
  return (
    <>
      <Breadcrumd breadcrumbs={breadcrumbs.info} page={breadcrumbs.page} />
      <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
        <div className="container">
          <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
            <Sidebar />
            <div className="list-product-block style-grid lg:w-3/4 md:w-2/3 w-full md:pl-3">
              <FilterHeading />
              <div className="list-filtered flex items-center gap-3 flex-wrap"></div>
              <ProductList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
