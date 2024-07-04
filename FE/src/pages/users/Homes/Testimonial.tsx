// import Swiper JS
// import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
// import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { IReviews } from "@/interfaces/reviews";
import { getAllReviews } from "@/services/reviews";
import { AxiosError } from "axios";
import { ToastError } from "@/lib/utils";
const Testimonial = () => {
  const [reviews, setReviews] = useState<IReviews[]>();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllReviews("review", "nonempty");
        setReviews(data?.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          ToastError(error?.response?.data?.message);
        }
      }
    })();
  }, []);
  const renderStars = (avg: number, size: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={size}
          className=""
          color="#ee4d2d"
          fill={i < avg ? "#ee4d2d" : "#eee"}
        />
      );
    }
    return stars;
  };
  return (
    <div className="testimonial-block md:pt-20 md:pb-16 pt-10 pb-8 md:mt-20 mt-10 bg-surface">
      <div className="container">
        <div className="heading3 text-center">Mọi người nói gì</div>
        <div className="list-testimonial pagination-mt40 md:mt-10 mt-6">
          <div className="swiper swiper-list-testimonial h-full relative">
            <Swiper
              className="swiper-wrapper"
              modules={[Pagination, Autoplay]}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
              }}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              touchEventsTarget="wrapper"
              slidesPerView={1}
              spaceBetween={0}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {reviews?.map((review) => (
                <SwiperSlide key={review?._id} className="swiper-slide ">
                  <div className="testimonial-item style-one h-full">
                    <div className="testimonial-main bg-gray-50 p-8 rounded-2xl h-full">
                      <div className="flex items-center gap-1">
                        {renderStars(Math.floor(review?.rating), 20).map(
                          (star, index) => (
                            <li key={index}>{star}</li>
                          )
                        )}
                      </div>

                      <div className="heading6 title mt-4">
                        {review?.productId?.name}
                      </div>
                      <div className="desc mt-2">{review?.review}</div>
                      <div className="text-button name mt-4">
                        {review?.userId?.name?.last_name}{" "}
                        {review?.userId?.name?.first_name}
                      </div>
                      <div className="caption2 date text-gray-500 mt-1">
                        {new Date(review?.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-pagination" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
