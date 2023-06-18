import { useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Quantity = ({ value, setValue, maxQty, isCartPage }) => {
  useEffect(() => {
    if (maxQty <= 0) {
      setValue(0);
    }
  }, [maxQty]);

  const increaseQty = () => {
    if (value < maxQty) {
      setValue(value + 1);
    }
  };

  const decreaseQty = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handleOnChangeQty = (e) => {
    const valueInt = parseInt(e.target.value);

    if (valueInt < 0 || !valueInt) {
      setValue(0);
    } else if (valueInt > maxQty) {
      setValue(maxQty);
    } else {
      setValue(valueInt);
    }
  };

  return (
    <div className="inline-flex items-center">
      <button
        className={`flex h-[39px] w-[39px] items-center justify-center transition duration-300 ${
          isCartPage
            ? "border border-r-0 border-gray-200 hover:text-green"
            : "bg-gray-300 hover:bg-green hover:text-white"
        }`}
        type="button"
        onClick={() => decreaseQty()}
      >
        <AiOutlineMinus className="text-lg" />
      </button>
      <input
        type="number"
        className={`h-[39px] w-[39px] bg-white text-center leading-[39px] ${
          isCartPage ? "border border-gray-200" : ""
        }`}
        value={value}
        onChange={(e) => handleOnChangeQty(e)}
      />
      <button
        className={`flex h-[39px] w-[39px] items-center justify-center transition duration-300 ${
          isCartPage
            ? "border border-l-0 border-gray-200 hover:text-green"
            : "bg-gray-300 hover:bg-green hover:text-white"
        }`}
        type="button"
        onClick={() => increaseQty()}
      >
        <AiOutlinePlus className="text-lg" />
      </button>
    </div>
  );
};

export default Quantity;
