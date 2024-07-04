import { getSimilarProducts } from "@/services/product";
import LoadingFixed from "@/components/LoadingFixed";
import { IProduct } from "@/interfaces/product";
import { ToastError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "../Shops/Products/ProductItem";
import { memo } from "react";
interface IPropsSimilarProduct {
  category: string;
  slug: string;
}
const SimilarProduct = (props: IPropsSimilarProduct) => {
  const {
    data: listProductSimilar,
    isLoading,
    isError,
  } = useQuery<IProduct[]>({
    queryKey: ["GET_SIMILAR_PRODUCTS", props.category, props.slug],
    queryFn: async () => {
      const { data } = await getSimilarProducts(props.category, props.slug);
      return data.data;
    },
  });
  if (isLoading) {
    return <LoadingFixed />;
  }
  if (isError) {
    ToastError("Sảy ra lỗi khi lấy sản phẩm tương tự");
  }

  if (listProductSimilar && listProductSimilar?.length <= 0) {
    return (
      <div className="collection-block container max-w-7xl bg-white mt-10 pt-10 py-20">
        <div className="container">
          <div className="text-lg font-medium text-center uppercase">
            Sản phẩm tương tự
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/product-not-found.jpg" alt="" />
        </div>
      </div>
    );
  }
  return (
    <div className="collection-block container max-w-7xl bg-white mt-10 pt-10 py-20">
      <div className="container">
        <div className="flex items-center justify-center">
          <h2 className="w-max relative text-lg font-medium text-center uppercase ">
            Sản phẩm tương tự
          </h2>
        </div>
      </div>
      <div className="list-collection relative section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4">
        <div className="swiper-button-prev lg:left-10 left-6" />
        <div className="swiper swiper-collection  relative">
          <Swiper
            className="swiper-wrapper "
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            // loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            slidesPerView={2}
            spaceBetween={16}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 7,
                spaceBetween: 20,
              },
            }}
          >
            {listProductSimilar?.map((product) => (
              <SwiperSlide
                key={product._id}
                className="swiper-slide bg-gray-100 p-3 rounded-lg"
              >
                <div>
                  <ProductItem product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="swiper-button-next lg:right-10 right-6" />
      </div>
    </div>
  );
};

export default memo(SimilarProduct);
