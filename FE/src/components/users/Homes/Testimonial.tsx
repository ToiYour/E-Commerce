// import Swiper JS
// import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
// import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";
const Testimonial = () => {
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
              <SwiperSlide className="swiper-slide ">
                <div className="testimonial-item style-one h-full">
                  <div className="testimonial-main bg-gray-50 p-8 rounded-2xl h-full">
                    <div className="flex items-center gap-1">
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#dfdedd" strokeWidth={0} />
                    </div>
                    <div className="heading6 title mt-4">
                      Variety of Styles!
                    </div>
                    <div className="desc mt-2">
                      "Fantastic shop! Great selection, fair prices, and
                      friendly staff. Highly recommended. The quality of the
                      products is exceptional, and the prices are very
                      reasonable!"
                    </div>
                    <div className="text-button name mt-4">Lisa K.</div>
                    <div className="caption2 date text-secondary2 mt-1">
                      August 13, 2024
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-item style-one h-full">
                  <div className="testimonial-main bg-gray-50 p-8 rounded-2xl h-full">
                    <div className="flex items-center gap-1">
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#dfdedd" strokeWidth={0} />
                    </div>
                    <div className="heading6 title mt-4">
                      Quality of Clothing!
                    </div>
                    <div className="desc mt-2">
                      "Anvouge's fashion collection is a game-changer! Their
                      unique and trendy pieces have completely transformed my
                      style. It's comfortable, stylish, and always on-trend."
                    </div>
                    <div className="text-button name mt-4">Elizabeth A.</div>
                    <div className="caption2 date text-secondary2 mt-1">
                      August 13, 2024
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-item style-one h-full">
                  <div className="testimonial-main bg-gray-50 p-8 rounded-2xl h-full">
                    <div className="flex items-center gap-1">
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#dfdedd" strokeWidth={0} />
                    </div>
                    <div className="heading6 title mt-4">Customer Service!</div>
                    <div className="desc mt-2">
                      "I absolutely love this shop! The products are
                      high-quality and the customer service is excellent. I
                      always leave with exactly what I need and a smile on my
                      face."
                    </div>
                    <div className="text-button name mt-4">Christin H.</div>
                    <div className="caption2 date text-secondary2 mt-1">
                      August 13, 2024
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-item style-one h-full">
                  <div className="testimonial-main bg-gray-50 p-8 rounded-2xl h-full">
                    <div className="flex items-center gap-1">
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#dfdedd" strokeWidth={0} />
                    </div>
                    <div className="heading6 title mt-4">
                      Quality of Clothing!
                    </div>
                    <div className="desc mt-2">
                      "I can't get enough of Anvouge's high-quality clothing.
                      It's comfortable, stylish, and always on-trend. The
                      products are high-quality and the customer service is
                      excellent."
                    </div>
                    <div className="text-button name mt-4">Emily G.</div>
                    <div className="caption2 date text-secondary2 mt-1">
                      August 13, 2024
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-item style-one h-full">
                  <div className="testimonial-main bg-gray-50 p-8 rounded-2xl h-full">
                    <div className="flex items-center gap-1">
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#ecb018" strokeWidth={0} />
                      <Star fill="#dfdedd" strokeWidth={0} />
                    </div>
                    <div className="heading6 title mt-4">Customer Service!</div>
                    <div className="desc mt-2">
                      "I love this shop! The products are always top-quality,
                      and the staff is incredibly friendly and helpful. They go
                      out of their way to make sure that I'm satisfied my
                      purchase."
                    </div>
                    <div className="text-button name mt-4">Carolina C.</div>
                    <div className="caption2 date text-secondary2 mt-1">
                      August 13, 2024
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="swiper-pagination" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
