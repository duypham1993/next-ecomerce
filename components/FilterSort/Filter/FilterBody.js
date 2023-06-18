import { collapse } from "@/store/slices/filterSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

const FilterBody = ({ filters }) => {
  const router = useRouter();
  const expandState = useSelector((state) => state.filter.ariaExpaned);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (router.query.filter) {
      setFilter(router.query.filter);
    }
  }, [router.query.filter]);

  const handleOnChangeFilter = (e) => {
    const { value } = e.target;
    setFilter(value);
    router.query.page && delete router.query.page;

    router.push({
      query: { ...router.query, filter: value },
    });
  };

  const handleClearFilter = () => {
    setFilter("");
    const query = { ...router.query }; // create a copy of the query object
    delete query.filter; // remove the filter parameter from the query object
    router.replace({
      query,
    });
  };

  const handleClose = () => {
    dispatch(collapse());
  };
  return (
    <div
      className={`${
        expandState ? "opcacity-100 left-0" : "-left-[371px] opacity-0"
      } transiton absolute top-0 duration-500`}
    >
      <div className="mb-4 max-w-[300px] bg-white p-3 lg:p-4">
        <div className="items-start p-0">
          <div className="relative mb-3 border-b border-gray-200 pb-3 text-xs uppercase after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-[50px] after:bg-green after:content-['']">
            chọn tiêu chí hiển thị
          </div>
          <button
            className="border-0 bg-white p-1 md:hidden"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <button
          className="my-2 border border-green bg-green px-2 py-1 uppercase text-white transition duration-300  hover:bg-white hover:text-green"
          onClick={() => handleClearFilter()}
        >
          bỏ hết tiêu chí đã chọn
        </button>
        <div className="pt-2">
          <h6 className="mb-3 font-bold uppercase">xuất xứ</h6>
          <ul className="list-unstyled">
            {filters?.map((item, index) => {
              return (
                <li
                  className="mt-3 flex items-center font-light text-gray-600"
                  key={index}
                >
                  <input
                    type="radio"
                    id={index}
                    name="origin"
                    value={item._id}
                    className="cursor-pointer"
                    checked={item._id === filter}
                    onChange={(e) => handleOnChangeFilter(e)}
                  />
                  <label
                    htmlFor={index}
                    className="relative ml-1 cursor-pointer select-none"
                  >
                    {item.name}
                    <span className="absolute -top-[3px] -right-[20px] block h-[15px] min-w-[15px] border border-gray-200 text-center text-xs leading-[0.75rem] text-gray-400">
                      {item.count}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterBody;
