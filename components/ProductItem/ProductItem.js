import { useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "@/services/formatCurrency";
import Link from "next/link";
import Image from "next/image";
import { MdRemoveShoppingCart } from "react-icons/md";
import { BsBasketFill } from "react-icons/bs";
import { useAddToCart } from "@/hooks/useAddToCart";
import Quantity from "../Quantity/Quantity";

const ProductItem = ({ product, setShow }) => {
  const [value, setValue] = useState(1);
  const addToCart = useAddToCart();
  const { cart } = useSelector((state) => state.cart);
  const checkProduct = cart?.products?.filter(
    (item) => item._id === product._id
  )[0];
  const checkQty = checkProduct ? product.qty - checkProduct.qty : product.qty;
  const maxQty = checkQty < 0 ? 0 : checkQty;
  const productLink = `/products/${product._id}`;

  return (
    <div className="mb-6">
      <div className="group shadow">
        <Link href={productLink} className="block overflow-hidden">
          <div className="relative transition duration-300 group-hover:scale-[1.1]">
            <Image
              src={product.imgs[0]}
              alt={product.name}
              width={500}
              height={500}
            />
          </div>
        </Link>
        <div className="bg-white p-2">
          <h5 className="mb-1 px-1">
            <Link href={productLink} className="text-base hover:text-green">
              {product.name}
            </Link>
          </h5>
          <p className="mb-1 truncate px-1 italic text-gray-400">
            {product.desc}
          </p>
          <p className="mb-1 px-1 text-sm text-green">
            Xuất xứ: <span>{product.origin.name}</span>
          </p>
          <div className="flex justify-between px-1">
            <span className="text-sm text-red-200">[{product.packing}]</span>
            <span className="text-sm font-bold text-black">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>
        <div className="bg-gray-100">
          {product.qty > 0 ? (
            <div className="w-[158px] overflow-hidden whitespace-nowrap">
              <div className="group flex -translate-x-[117px] items-center transition duration-300 hover:translate-x-0">
                <Quantity value={value} setValue={setValue} maxQty={maxQty} />
                <button
                  className="ml-2 flex items-center border-0 text-gray-400 hover:text-green"
                  onClick={() => addToCart(product._id, value, setShow)}
                >
                  <BsBasketFill className="mx-1 text-xl" />
                  <span className="hidden pl-2 text-sm capitalize xl:inline">
                    Cho vào giỏ hàng
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-[39px] cursor-not-allowed items-center justify-center leading-[39px] text-gray-400">
              <MdRemoveShoppingCart className="text-2xl" />
              <span className="pl-1 text-sm capitalize">Tạm thời hết hàng</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
