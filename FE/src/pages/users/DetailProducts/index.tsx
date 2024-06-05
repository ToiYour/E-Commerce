import { getProductBySlug } from "@/services/product";
import LoadingFixed from "@/components/LoadingFixed";
import CustomerReview from "@/pages/users/CustomerReview";
import Album from "@/pages/users/DetailProducts/Album";
import InfoDetailProduct from "@/pages/users/DetailProducts/InfoDetailProduct";
import SimilarProduct from "@/pages/users/DetailProducts/SimilarProduct";
import { IProduct } from "@/interfaces/product";
import { ToastError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { slug } = useParams();
  const breadcrumbs = {
    info: [
      { title: "Trang chủ", urlLink: "/" },
      { title: "Sản phẩm", urlLink: "/shop" },
    ],

    page: "Sản phẩm",
  };
  const {
    data: detailProduct,
    isLoading,
    isError,
  } = useQuery<IProduct>({
    queryKey: ["GET_DETAIL_PRODUCT_SLUG", slug],
    queryFn: async () => {
      const { data } = await getProductBySlug(slug as string);
      document.title = data.data.name;
      return data.data;
    },
  });

  if (isLoading) {
    return <LoadingFixed />;
  }
  if (isError) {
    ToastError("Sảy ra lỗi khi lấy chi tiết sản phẩm");
  }
  if (detailProduct) {
    breadcrumbs.info.push({
      title: detailProduct.category?.[0].name as string,
      urlLink: `/shop?category=${detailProduct.category?.[0].slug}`,
    });
    breadcrumbs.page = detailProduct?.name as string;
  }
  return (
    <>
      <div className="breadcrumb-product bg-gray-100 ">
        <div className="main bg-surface md:pt-[88px] pt-[70px] pb-[14px]">
          <div className="container flex items-center justify-between flex-wrap gap-3">
            <div className="left flex items-center gap-1">
              {breadcrumbs?.info?.map((breadcrumb) => (
                <div
                  className="flex justify-center items-center"
                  key={breadcrumb.title}
                >
                  <Link
                    to={breadcrumb.urlLink}
                    className="caption1 text-gray-500 hover:underline"
                  >
                    {breadcrumb.title}
                  </Link>
                  <ChevronRight size={16} strokeWidth={1} />
                </div>
              ))}

              <div className="caption1 capitalize">{breadcrumbs.page}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-detail default">
        <div className="featured-product underwear filter-product-img md:py-20 py-14">
          <div className="container grid grid-cols-1 md:grid-cols-8 gap-y-6 md:gap-x-5 ">
            <Album images={detailProduct?.images as string[]} />
            <InfoDetailProduct product={detailProduct as IProduct} />
          </div>
        </div>
        <CustomerReview />
        <SimilarProduct
          category={detailProduct?.category?.[0].slug as string}
          slug={detailProduct?.slug as string}
        />
      </div>
    </>
  );
};

export default ProductDetail;
