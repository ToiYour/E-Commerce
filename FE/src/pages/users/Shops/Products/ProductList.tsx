import MyPagination from "@/components/MyPagination";
import ProductItem from "./ProductItem";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/product";
import LoadingFixed from "@/components/LoadingFixed";
import { ToastError } from "@/lib/utils";
import { IProduct } from "@/interfaces/product";
import { useSearchParams } from "react-router-dom";
import { IQueryParams } from "@/interfaces/queryparams";
import { memo } from "react";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  let queryParams: IQueryParams = {};
  for (const [key, value] of searchParams.entries()) {
    queryParams = { ...queryParams, [key]: value };
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["GET_HOME_PRODUCT_LIST", queryParams],
    queryFn: async () => {
      const { data } = await getAllProduct(location.search || "");
      return data?.data;
    },
  });
  const products = data?.docs as IProduct[];
  if (isLoading) {
    return <LoadingFixed />;
  }
  if (isError) {
    ToastError("Sảy ra lỗi ghi lấy sản phẩm");
  }
  if (products?.length == 0) {
    return (
      <img
        src="/images/no-product.png"
        alt=""
        className="w-3/4 mx-auto object-cover"
      />
    );
  }
  return (
    <>
      <div
        className="list-product hide-product-sold grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4
     sm:gap-[30px] gap-[20px] my-7"
      >
        {products?.map(
          (product) =>
            product.status && (
              <ProductItem key={product?._id} product={product} />
            )
        )}
      </div>
      <MyPagination totalPages={data?.totalPages} />
    </>
  );
};

export default memo(ProductList);
