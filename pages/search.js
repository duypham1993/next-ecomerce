import { useSelector } from "react-redux";
import { useState } from "react";
import ProductItem from "@/components/ProductItem/ProductItem";
import Image from "next/image";
import notFound from "@/public/imgs/search-not-found.png";
import dynamic from "next/dynamic";
import qs from "query-string";
import {
  getFiltersOfProduct,
  getProductsForSearchPage,
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

const SearchPage = ({ products, filters, pages }) => {
  const expandState = useSelector((state) => state.filter.ariaExpaned);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <>
      {products?.length > 0 ? (
        <div className="category">
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
    const url = {
      query: query.query,
      filter: query.filter,
      sort: query.sort,
      page: query.page,
    };
    const filters = await getFiltersOfProduct(`${qs.stringify(url)}`);
    const { products, pages } = await getProductsForSearchPage(
      qs.stringify(url)
    );
    return {
      props: {
        products,
        pages,
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

export default SearchPage;
