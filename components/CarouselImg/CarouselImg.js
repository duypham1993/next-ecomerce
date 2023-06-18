import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { FreeMode, Navigation, Thumbs } from "swiper";

const CarouselImg = ({ arrImg, alt }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="custom-swiper">
      <Swiper
        loop={true}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {arrImg?.map((img, index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                src={img}
                className="custom-carousel__img"
                width={1000}
                height={1000}
                alt={alt}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="mt-2">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={5}
          slidesPerView={8}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="swiper-thumb"
        >
          {arrImg?.map((img, index) => {
            return (
              <SwiperSlide
                key={index}
                className="custom-carousel__indicator-wrapper"
              >
                <Image
                  src={img}
                  className="custom-carousel__indicator-img"
                  alt={alt}
                  width={100}
                  height={100}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselImg;
