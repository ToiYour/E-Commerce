import LoadingFixed from "@/components/LoadingFixed";
import { IProduct } from "@/interfaces/product";
import { ToastError } from "@/lib/utils";
import Album from "@/pages/users/DetailProducts/Album";
import InfoDetailProduct from "@/pages/users/DetailProducts/InfoDetailProduct";
import SimilarProduct from "@/pages/users/DetailProducts/SimilarProduct";
import { getProductBySlug } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CommentOrReviews from "../CommentOrReview";
// import ShareDialog from "./ShareDialog";

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
    <div className="bg-gray-100">
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
                    className="caption1 text-sm text-nowrap text-gray-500 hover:underline"
                  >
                    {breadcrumb.title}
                  </Link>
                  <ChevronRight size={16} strokeWidth={1} />
                </div>
              ))}

              <div className="caption1 capitalize caption1 text-sm  line-clamp-1">
                {breadcrumbs.page}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-detail default space-y-10">
        <div className="featured-product underwear filter-product-img   ">
          <div className="container grid grid-cols-1 md:grid-cols-8 gap-y-6 md:gap-x-5 bg-white py-10">
            <div className="col-span-3 space-y-5">
              <Album images={detailProduct?.images as string[]} />
              {/* <ShareDialog
                title={detailProduct?.name || ""}
                desc={detailProduct?.desc || ""}
                img={detailProduct?.images?.[0] as string}
              /> */}
            </div>
            <InfoDetailProduct product={detailProduct as IProduct} />
          </div>
        </div>
        <CommentOrReviews />
        <SimilarProduct
          category={detailProduct?.category?.[0].slug as string}
          slug={detailProduct?.slug as string}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
