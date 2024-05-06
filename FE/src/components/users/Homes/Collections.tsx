// import Swiper JS
// import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Navigation } from "swiper/modules";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Collections = () => {
  return (
    <div className="collection-block md:pt-20 pt-10">
      <div className="container">
        <div className="heading3 text-center">Danh mục</div>
      </div>
      <div className="list-collection relative section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4">
        <div className="swiper-button-prev lg:left-10 left-6" />
        <div className="swiper swiper-collection h-full relative">
          <Swiper
            className="swiper-wrapper"
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            loop={true}
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
            <SwiperSlide className="swiper-slide">
              <a
                href="shop-breadcrumb1.html"
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="bg-img">
                  <img
                    src="https://i.pinimg.com/564x/76/78/89/767889539805db3efd95e7dde432a11b.jpg"
                    alt="swimwear"
                  />
                </div>
                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">
                  swimwear
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <a
                href="shop-breadcrumb1.html"
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="bg-img">
                  <img
                    src="https://i.pinimg.com/564x/76/78/89/767889539805db3efd95e7dde432a11b.jpg"
                    alt="top"
                  />
                </div>
                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">
                  top
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <a
                href="shop-breadcrumb1.html"
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="bg-img">
                  <img
                    src="https://i.pinimg.com/564x/76/78/89/767889539805db3efd95e7dde432a11b.jpg"
                    alt="sets"
                  />
                </div>
                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">
                  sets
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <a
                href="shop-breadcrumb1.html"
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="bg-img">
                  <img
                    src="https://i.pinimg.com/564x/76/78/89/767889539805db3efd95e7dde432a11b.jpg"
                    alt="outerwear"
                  />
                </div>
                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">
                  outerwear
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <a
                href="shop-breadcrumb1.html"
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="bg-img">
                  <img
                    src="https://i.pinimg.com/564x/76/78/89/767889539805db3efd95e7dde432a11b.jpg"
                    alt="underwear"
                  />
                </div>
                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">
                  underwear
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <a
                href="shop-breadcrumb1.html"
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="bg-img">
                  <img
                    src="https://i.pinimg.com/564x/76/78/89/767889539805db3efd95e7dde432a11b.jpg"
                    alt="t-shirt"
                  />
                </div>
                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">
                  t-shirt
                </div>
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="swiper-button-next lg:right-10 right-6" />
      </div>
    </div>
  );
};

export default Collections;
