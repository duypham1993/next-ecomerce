import bannerBMM from "@/public/imgs/bmm.webp";
import bannerTet from "@/public/imgs/banner-tet.webp";
import bannerOrange from "@/public/imgs/camsanh.webp";
import blog1 from "@/public/imgs/blog/blog-1.webp";
import blog2 from "@/public/imgs/blog/blog-2.webp";
import blog3 from "@/public/imgs/blog/blog-3.webp";
import blog4 from "@/public/imgs/blog/blog-4.webp";
import blog5 from "@/public/imgs/blog/blog-5.webp";
import blog6 from "@/public/imgs/blog/blog-6.webp";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Home({ arrBanner, arrBlog }) {
  return (
    <div className="pb-3 md:pt-5 md:pb-4">
      <div className="container">
        {/* Banner */}
        <section>
          {arrBanner.map((item, index) => (
            <div className="mb-2" key={index}>
              <Link href={item.link}>
                <Image src={item.imgUrl} alt={item.alt} />
              </Link>
            </div>
          ))}
        </section>

        {/* Blog */}
        <section className="pb-2">
          <div className="my-3 text-center md:my-5">
            <h3 className="text-2xl">
              <Link href="#" className="link-df">
                HIỂU VỀ NÔNG NGHIỆP BẢN ĐỊA
              </Link>
            </h3>
            <h5 className="text-xl">
              Từ Bón Phân, Gieo Cấy Tới Thu Hoạch, Đóng Gói
            </h5>
          </div>
          <div className="overflow-hidden">
            <Swiper
              slidesPerView={1}
              spaceBetween={7}
              pagination={{
                clickable: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 7,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 7,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 7,
                },
              }}
              className="mySwiper"
            >
              {arrBlog.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="px-2">
                      <div>
                        <Link href={item.link}>
                          <Image src={item.imgUrl} alt={item.alt} />
                        </Link>
                      </div>
                      <div className="relative bg-yellow-100 p-2 pt-3 md:p-4">
                        <div className="relative z-20 mb-2 text-center">
                          <Link
                            href={item.link}
                            className="link-df text-uppercase text-xl hover:text-green"
                          >
                            {item.title}
                          </Link>
                        </div>
                        <p className="mb-3 text-center">{item.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">{item.author}</span>
                          <Link
                            href={item.link}
                            className="link-df inline-flex items-center text-xs hover:text-green"
                          >
                            <span>Xem thêm</span>
                          </Link>
                        </div>
                        <div className="absolute left-1/2 -top-[30px] z-10 flex h-[60px] w-[60px] -translate-x-1/2 items-center justify-center rounded-full bg-yellow-100"></div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=43200, stale-while-revalidate=60"
  );

  const arrBanner = [
    {
      link: "/product/63de2a624104240d73b8749e",
      imgUrl: bannerBMM,
      alt: "Bột Mộc Mát",
    },
    {
      link: "/chon-loc",
      imgUrl: bannerTet,
      alt: "Tết Ba Lành",
    },
    {
      link: "/product/63ddd19719588c66c8865ae8",
      imgUrl: bannerOrange,
      alt: "Cam Sành Hàm Yên",
    },
  ];

  const arrBlog = [
    {
      link: "#",
      imgUrl: blog1,
      alt: "Lorem ipsum dolor sit amet",
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      author: "Mạc Linh",
    },
    {
      link: "#",
      imgUrl: blog2,
      alt: "Lorem ipsum dolor sit amet",
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      author: "Mạc Linh",
    },
    {
      link: "#",
      imgUrl: blog3,
      alt: "Lorem ipsum dolor sit amet",
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      author: "Mạc Linh",
    },
    {
      link: "#",
      imgUrl: blog4,
      alt: "Lorem ipsum dolor sit amet",
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      author: "Mạc Linh",
    },
    {
      link: "#",
      imgUrl: blog5,
      alt: "Lorem ipsum dolor sit amet",
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      author: "Mạc Linh",
    },
    {
      link: "#",
      imgUrl: blog6,
      alt: "Lorem ipsum dolor sit amet",
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      author: "Mạc Linh",
    },
  ];

  return {
    props: {
      arrBanner,
      arrBlog,
    },
  };
}
