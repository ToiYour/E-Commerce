import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Navigation } from "swiper/modules";
// import Swiper styles
import { ICategory } from "@/interfaces/category";
import { getComboboxCategory } from "@/services/category";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

const Collections = () => {
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
  return (
    <div className="collection-block bg-gray-50 mt-10 pt-10 py-20">
      <div className="container">
        <div className="heading3 text-center">Danh mục</div>
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
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {categorys?.map(
              (category) =>
                category.status && (
                  <SwiperSlide key={category._id} className="swiper-slide">
                    <Link
                      to={`/shop?category=${category.slug}`}
                      className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer h-full"
                    >
                      <div className="bg-img ">
                        <img
                          src={category.img as string}
                          alt="swimwear"
                          className=" object-cover"
                        />
                      </div>
                      <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">
                        {category.name}
                      </div>
                    </Link>
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </div>
        <div className="swiper-button-next lg:right-10 right-6" />
      </div>
    </div>
  );
};

export default Collections;
