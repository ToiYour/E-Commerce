// import Swiper JS
// import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
// import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
const Slides = () => {
  return (
    <div className="slider-block style-one bg-linear xl:h-[860px] lg:h-[800px] md:h-[580px] sm:h-[500px] h-[350px] max-[420px]:h-[320px] w-full">
      <div className="slider-main h-full w-full">
        <div className="swiper swiper-slider h-full relative">
          {/* <div className="swiper-wrapper"> */}
          <Swiper
            className={"swiper-wrapper"}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide className="swiper-slide">
              {/* <div className="swiper-slide"> */}
              <div className="slider-item h-full w-full relative">
                <div className="container w-full h-full flex items-center relative">
                  <div className="text-content basis-1/2">
                    <div className="text-sub-display">Sale! Up To 50% Off!</div>
                    <div className="text-display md:mt-5 mt-2">
                      Summer Sale Collections
                    </div>
                    <a
                      href="shop-breadcrumb-img.html"
                      className="button-main md:mt-8 mt-3"
                    >
                      Shop Now
                    </a>
                  </div>
                  <div className="sub-img absolute sm:w-1/2 w-3/5 2xl:-right-[60px] -right-[16px] bottom-0">
                    <img
                      src="/images/sliders/slide-1.png"
                      alt="bg1-1"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
              {/* </div> */}
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              {/* <div className="swiper-slide"> */}
              <div className="slider-item h-full w-full relative">
                <div className="container w-full h-full flex items-center relative">
                  <div className="text-content basis-1/2">
                    <div className="text-sub-display">Sale! Up To 50% Off!</div>
                    <div className="text-display md:mt-5 mt-2">
                      Fashion for Every Occasion
                    </div>
                    <a
                      href="shop-breadcrumb-img.html"
                      className="button-main md:mt-8 mt-3"
                    >
                      Shop Now
                    </a>
                  </div>
                  <div className="sub-img absolute w-1/2 2xl:-right-[60px] -right-[0] sm:-bottom-[60px] bottom-0">
                    <img
                      src="/images/sliders/slide-2.png"
                      alt="bg1-2"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
              {/* </div> */}
            </SwiperSlide>
          </Swiper>
          {/* </div> */}
          <div className="swiper-pagination" />
        </div>
      </div>
    </div>
  );
};

export default Slides;
