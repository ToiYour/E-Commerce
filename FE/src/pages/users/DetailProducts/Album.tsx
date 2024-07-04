import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { ArrowLeft, ArrowRight } from "lucide-react";
import { memo, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";

const Album = ({ images }: { images: string[] }) => {
  const swiperRef = useRef<SwiperType>();
  return (
    <div className="detail-product-ablums   w-full bg-white">
      <div className=" relative">
        <Swiper
          rewind={true}
          pagination={{
            type: "fraction",
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          lazyPreloaderClass="swiper-lazy-preloader"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {images?.map((image) => (
            <SwiperSlide key={image} className="">
              <img
                src={image}
                alt=""
                className="w-auto h-auto "
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <ArrowLeft
          onClick={() => swiperRef?.current?.slidePrev()}
          className="absolute top-1/2 lg:left-7 left-6 z-10 cursor-pointer"
          size={34}
          color="#ee4d2d"
        />

        <ArrowRight
          onClick={() => swiperRef?.current?.slideNext()}
          className="absolute top-1/2 lg:right-7 right-6 z-10 cursor-pointer "
          size={34}
          color="#ee4d2d"
        />
      </div>
    </div>
  );
};

export default memo(Album);
