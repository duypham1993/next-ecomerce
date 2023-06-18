import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductItem from "@/components/ProductItem/ProductItem";
import Banner from "@/components/Banner/Banner";
import Image from "next/image";
import notFound from "@/public/imgs/search-not-found.png";
import { getCategories } from "@/services/categoryApi/categoryApi";
import dynamic from "next/dynamic";
import qs from "query-string";
import {
  getFiltersOfProduct,
  getProductsOfCategory,
} from "@/services/productApi/productApi";

const FilterSort = dynamic(
  () => import("../components/FilterSort/FilterSort"),
  { ssr: false }
);

const FilterBody = dynamic(
  () => import("../components/FilterSort/Filter/FilterBody"),
  { ssr: false }
);

const SuccessNoti = dynamic(
  () => import("../components/SuccessNoti/SuccessNoti"),
  { ssr: false }
);

const Pagination = dynamic(
  () => import("../components/Pagination/Pagination"),
  { ssr: false }
);

const Products = ({ products, filters, currentCategory, pages }) => {
  const expandState = useSelector((state) => state.filter.ariaExpaned);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <>
      {products?.length > 0 ? (
        <div className="category">
          {currentCategory && (
            <Banner
              name={currentCategory.name}
              desc={currentCategory.desc}
              img={currentCategory.img}
            />
          )}
          <FilterSort />
          <div className="container">
            <div className="relative flex items-start justify-end">
              <FilterBody filters={filters} />

              <div
                className={`${
                  expandState ? "w-full md:w-3/4" : "w-full"
                } transition-all duration-500`}
              >
                <div className="-mx-2 flex flex-wrap">
                  {products.map((product, index) => {
                    return (
                      <div
                        className={expandState ? "w-1/4 px-2" : "w-1/5 px-2"}
                        key={index}
                      >
                        <ProductItem product={product} setShow={setShow} />
                      </div>
                    );
                  })}
                </div>
                <Pagination totalProducts={products.length} pages={pages} />
              </div>
            </div>
          </div>
          <SuccessNoti show={show} handleClose={handleClose} />
        </div>
      ) : (
        <div className="my-2 md:my-3">
          <div className="container">
            <div className="bg-white py-3 text-center md:py-4">
              <div className="">
                <Image src={notFound} alt="Not found" className="mx-auto" />
              </div>
              <h4 className="text-lg font-bold">Không tìm thấy sản phẩm</h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async ({ res, query }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=10"
  );
  try {
    const { categories } = await getCategories();
    const [currentCategory] = categories.filter(
      (category) => category.slug === query.slug
    );
    const filters = await getFiltersOfProduct(`id=${currentCategory._id}`);

    const url = {
      filter: query.filter,
      sort: query.sort,
      page: query.page,
    };
    const products = await getProductsOfCategory({
      id: currentCategory._id,
      url: qs.stringify(url),
    });
    return {
      props: {
        currentCategory,
        products: products.products,
        pages: products.pages,
        filters,
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      props: {},
    };
  }
};

// export const getStaticPaths = async (context) => {
//   console.log("test", context);
//   try {
//     const { categories } = await getCategories();
//     const paths = categories.map((category) => ({
//       params: { slug: category.slug },
//     }));
//     return {
//       paths,
//       fallback: "blocking",
//     };
//   } catch (error) {
//     console.log("path err", error);
//   }
// };

// export const getStaticProps = async ({ params }) => {
//   try {
//     const { categories } = await getCategories();
//     const [currentCategory] = categories.filter(
//       (item) => item.slug === params.slug
//     );
//     const { products, pages } = await getProductsOfCategory({
//       id: currentCategory._id,
//     });
//     const filters = await getFiltersOfProduct(currentCategory._id);
//     return {
//       props: {
//         products,
//         pages,
//         currentCategory,
//         filters,
//       },
//       revalidate: 60,
//     };
//   } catch (error) {
//     console.log("err", error);
//     return {
//       notFound: true,
//     };
//   }
// };

export default Products;
