import { useDispatch, useSelector } from "react-redux";
import { collapse } from "@/store/slices/filterSlice";
import { AiOutlineCheck, AiFillEyeInvisible } from "react-icons/ai";

const FilterHeader = () => {
  const dispatch = useDispatch();
  let expandState = useSelector((state) => state.filter.ariaExpaned);

  return (
    <div className="max-w-[300px] filter">
      <button
        className="flex items-center bg-green text-white"
        onClick={() => dispatch(collapse())}
      >
        <span className="flex h-[32px] w-[32px] items-center justify-center bg-[#5da04b]">
          {expandState ? (
            <AiOutlineCheck className="text-lg" />
          ) : (
            <AiFillEyeInvisible className="text-lg" />
          )}
        </span>
        <span className="px-3 uppercase">bộ lọc sản phẩm</span>
      </button>
    </div>
  );
};

export default FilterHeader;
