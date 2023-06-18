import { formatCurrency } from "@/services/formatCurrency";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const SearchResult = ({ searchResult, show }) => {
  return (
    <>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        show={show}
      >
        <div className="absolute left-0 z-[100] mt-2 max-h-[285px] w-full origin-top-right overflow-auto border border-gray-200 bg-white pt-2 shadow focus:outline-none">
          {searchResult?.length > 0 ? (
            searchResult.map((product, index) => (
              <div key={index} className="border-b border-dashed">
                <Link
                  href={`/product/${product._id}`}
                  className="flex py-1 pl-1 transition duration-200 hover:bg-gray-100"
                >
                  <div className="relative mr-2">
                    <Image
                      src={product.imgs[0]}
                      alt={product.name}
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <p>{product.name}</p>
                    <p>
                      <span className="font-bold text-black">
                        {formatCurrency(product.price)} /{" "}
                      </span>
                      <span className="font-bold text-red-100">
                        {product.packing}
                      </span>
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <>Không tìm thấy kết quả</>
          )}
        </div>
      </Transition>
    </>
  );
};

export default SearchResult;
