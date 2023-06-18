import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useDebounce from "@/hooks/useDeboune";
import { updateCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import { AiOutlineCloseSquare } from "react-icons/ai";
import useRemoveProductCart from "@/hooks/useRemoveProductCart";
import { formatCurrency } from "@/services/formatCurrency";
import Quantity from "../Quantity/Quantity";

const ProductItemCart = ({ customerID, product }) => {
  const dispatch = useDispatch();
  const removeProductCart = useRemoveProductCart();
  const [value, setValue] = useState(product.qty);
  const total = product.price * product.qty;

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const update = {
      customerID: customerID,
      product: {
        _id: product._id,
        qty: debouncedValue <= 0 ? 1 : debouncedValue,
      },
    };

    debouncedValue && dispatch(updateCart(update));
  }, [debouncedValue]);

  return (
    <div className="product-item">
      <div className="flex items-start">
        <div className="w-1/3 lg:w-1/4">
          <div className="product-item__wrapper-img">
            <Image
              src={product.imgs[0]}
              alt={product.name}
              width={120}
              height={120}
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-2/3 lg:w-3/4">
          <div className="flex">
            <div className="lg:w-1/3">
              <p className="pb-1 text-base">{product.name}</p>
              <p className="flex items-center pb-2">
                <span className="pr-4">{formatCurrency(product.price)}</span>
                <span className="">{product.packing}</span>
              </p>
            </div>
            <div className="lg:w-2/3">
              <div className="relative flex items-center">
                <div className="lg:w-1/2">
                  <Quantity
                    value={value}
                    setValue={setValue}
                    maxQty={product.maxQty}
                    isCartPage={true}
                  />
                </div>
                <div className="flex lg:w-1/2">
                  <p className="pe-4">
                    <strong>{formatCurrency(total)}</strong>
                  </p>
                </div>
                <button
                  className="product-item__remove"
                  onClick={() => removeProductCart(customerID, product._id)}
                >
                  <AiOutlineCloseSquare className="duraiton-300 text-2xl transition hover:text-red-100" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemCart;
