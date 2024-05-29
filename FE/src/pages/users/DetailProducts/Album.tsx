import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { memo } from "react";
const Album = ({ images }: { images: string[] }) => {
  return (
    <div className="list-img col-span-3  w-full ">
      <div className="list-collection relative section-swiper-navigation">
        <div className="swiper-button-prev lg:left-7 left-6 " />
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {images?.map((image) => (
            <SwiperSlide key={image}>
              <img src={image} alt="" className="w-auto h-auto " />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-next lg:right-7 right-6" />
      </div>
    </div>
  );
};

export default memo(Album);
