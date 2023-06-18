import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

const Pagination = ({ totalProducts, pages }) => {
  const length = pages > 5 ? 5 : pages;
  const router = useRouter();
  const currentPage = parseInt(router.query.page) || 1;

  const handleChangePage = (value) => {
    const { query } = router;
    router.push({
      query: { ...query, page: value },
    });
  };
  return (
    <div className="mb-3 flex items-center bg-white py-2 px-4 text-gray-600 shadow">
      <div className="w-full md:w-1/2">
        <p className="mb-2 text-sm md:mb-0">
          {totalProducts > 40
            ? `Hiển thị 40/${totalProducts} sản phẩm`
            : `Hiển thị ${totalProducts} sản phẩm`}
        </p>
      </div>
      <div className="w-full md:w-1/2">
        <div className="flex items-center justify-end">
          {currentPage > 4 && pages > 5 && (
            <span
              className="flex h-[34px] w-[36px] cursor-pointer select-none items-center justify-center border border-gray-200 leading-[34px] text-gray-600 transition hover:bg-gray-100 hover:text-green"
              onClick={() => handleChangePage(1)}
            >
              <AiOutlineDoubleLeft />
            </span>
          )}
          {currentPage > 1 && (
            <span
              className="flex h-[34px] w-[36px] cursor-pointer select-none items-center justify-center border border-gray-200 leading-[34px] text-gray-600 transition hover:bg-gray-100 hover:text-green"
              onClick={() => handleChangePage(currentPage - 1)}
            >
              <AiOutlineLeft />
            </span>
          )}
          {currentPage < 5 ? (
            <>
              {[...new Array(length)].map((item, index) => (
                <span
                  className={`${
                    currentPage == index + 1
                      ? "!border-green !bg-green !text-white"
                      : ""
                  } flex h-[34px] w-[36px] cursor-pointer select-none items-center justify-center border border-gray-200 leading-[34px] text-gray-600 transition hover:bg-gray-100 hover:text-green`}
                  onClick={() => handleChangePage(index + 1)}
                  key={index}
                >
                  {index + 1}
                </span>
              ))}
              {currentPage < pages && (
                <span
                  className="flex h-[34px] w-[36px] cursor-pointer select-none items-center justify-center border border-gray-200 leading-[34px] text-gray-600 transition hover:bg-gray-100 hover:text-green"
                  onClick={() => handleChangePage(currentPage + 1)}
                >
                  <AiOutlineRight />
                </span>
              )}
              {pages > 5 && (
                <span
                  className="flex h-[34px] w-[36px] cursor-pointer select-none items-center justify-center border border-gray-200 leading-[34px] text-gray-600 transition hover:bg-gray-100 hover:text-green"
                  onClick={() => handleChangePage(pages)}
                >
                  <AiOutlineDoubleRight />
                </span>
              )}
            </>
          ) : currentPage > pages - 4 ? (
            <>
              {[...new Array(length)].map((item, index) => (
                <span
                  className={`${
                    currentPage == pages - 4 + index
                      ? "!border-green !bg-green !text-white"
                      : ""
                  } flex h-[34px] w-[36px] cursor-pointer select-none items-center justify-center border border-gray-200 leading-[34px] text-gray-600 transition hover:bg-gray-100 hover:text-green`}
                  key={index}
                  onClick={() => handleChangePage(pages - 4 + index)}
                >
                  {pages - 4 + index}
                </span>
              ))}
              {currentPage < pages && (
                <span
                  className="flex h-[34px] w-[36px] cursor-pointer select-none items-center justify-center border border-gray-200 leading-[34px] text-gray-600 transition hover:bg-gray-100 hover:text-green"
                  onClick={() => handleChangePage(currentPage + 1)}
                >
                  <AiOutlineLeft />
                </span>
              )}
            </>
          ) : (
            <>
              {[...new Array(length)].map((item, index) => (
                <span
                  className={`${
                    currentPage == currentPage - 2 + index
                      ? "!border-green !bg-green !text-white"
                      : ""
                  } flex h-[34px] w-[36px] cursor-pointer select-none items-center justify-center border border-gray-200 leading-[34px] text-gray-600 transition hover:bg-gray-100 hover:text-green`}
                  key={index}
                  onClick={() => handleChangePage(currentPage - 2 + index)}
                >
                  {currentPage - 2 + index}
                </span>
              ))}
              {currentPage < pages && (
                <span
                  className="flex h-[34px] w-[36px] cursor-pointer select-none items-center justify-center border border-gray-200 leading-[34px] text-gray-600 transition hover:bg-gray-100 hover:text-green"
                  onClick={() => handleChangePage(currentPage + 1)}
                >
                  <AiOutlineRight />
                </span>
              )}
              {pages > 5 && (
                <span
                  className="flex h-[34px] w-[36px] cursor-pointer select-none items-center justify-center border border-gray-200 leading-[34px] text-gray-600 transition hover:bg-gray-100 hover:text-green"
                  onClick={() => handleChangePage(pages)}
                >
                  <AiOutlineDoubleRight />
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
