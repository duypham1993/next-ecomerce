import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
import useSWR from "swr";
import useDebounce from "@/hooks/useDeboune";
import { publicRequest } from "@/share/axios/requestMethod";
import dynamic from "next/dynamic";

const SearchResult = dynamic(() => import("./SearchResult"), { ssr: false });

const SearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState(
    router.query.query ? router.query.query : ""
  );
  const [show, setShow] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const inputRef = useRef(null);
  const fetcher = async (query) => {
    const res = await publicRequest.get(
      `product/client/quickSearch?query=${query}`
    );
    return res.data;
  };

  const {
    data: searchResult,
    error,
    isLoading,
  } = useSWR(debouncedQuery ? debouncedQuery : null, fetcher);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        handleClose();
        document.removeEventListener("mousedown", handleOutsideClick);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show]);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    query.trim() && router.push(`/search?query=${query}`);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="TÌM THEO SẢN PHẨM..."
          className="w-full border-b-2 border-black py-3 pr-6 text-xs font-bold italic text-green placeholder:italic placeholder:text-green"
          value={query}
          onChange={(e) => handleOnChange(e)}
          onFocus={() => handleShow()}
          ref={inputRef}
        />

        <button
          disabled={isLoading}
          type="submit"
          className={`${
            isLoading ? "cursor-wait" : ""
          } absolute right-0 top-1/2 -translate-y-1/2 py-2 outline-0`}
        >
          {isLoading ? (
            <div
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          ) : (
            <AiOutlineSearch className="flex text-lg" />
          )}
        </button>
      </form>

      {searchResult?.length > 0 && (
        <SearchResult searchResult={searchResult} show={show} />
      )}
    </div>
  );
};

export default SearchBox;
