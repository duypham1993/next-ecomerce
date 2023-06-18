import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import Link from "next/link";
import useRemoveProductCart from "@/hooks/useRemoveProductCart";
import { getCart } from "@/store/slices/cartSlice";
import { formatCurrency } from "@/services/formatCurrency";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineShoppingCart, AiOutlineCaretDown } from "react-icons/ai";
import Image from "next/image";

const Cart = () => {
  const dispatch = useDispatch();
  const removeProductCart = useRemoveProductCart();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { cart } = useSelector((state) => state.cart);
  const cartCount =
    cart.products?.reduce(
      (total, currentProduct) => total + currentProduct.qty,
      0
    ) || 0;
  const cartTotal =
    cart.products?.reduce(
      (total, currentProduct) =>
        total + currentProduct.qty * currentProduct.price,
      0
    ) || 0;
  const customerID = cart.customerID;

  useEffect(() => {
    Object.keys(currentUser).length > 0 && dispatch(getCart(currentUser._id));
  }, [currentUser]);

  return (
    <div className="cart">
      <Menu className="relative inline-block text-left" as="div">
        <Menu.Button className="flex w-full items-center justify-center">
          <span className="relative">
            <AiOutlineShoppingCart className="flex text-xl" />
            <span className="absolute -top-[10px] -right-1/2 bg-[#35c9b1] px-[5px] text-xs text-white">
              {cartCount}
            </span>
          </span>
          <span className="hidden pl-5 font-bold md:inline">
            {formatCurrency(cartTotal)}
          </span>
          <AiOutlineCaretDown className="ml-1 text-xs" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 mt-2 w-[340px] origin-top-right divide-y divide-gray-100 border border-gray-200 bg-white p-6 shadow">
            {cart?.products?.length ? (
              <div>
                <div className="mb-2 flex justify-between">
                  <div className="mb-2">
                    <p>SẢN PHẨM</p>
                    <p>{cartCount}</p>
                  </div>
                  <div className="mb-2 text-right">
                    <p>THÀNH TIỀN</p>
                    <p className="font-bold">{formatCurrency(cartTotal)}</p>
                  </div>
                </div>

                <div className="border-b border-green py-2 text-xs">
                  {cart.products?.map((product, index) => (
                    <div className="relative mb-3 flex" key={index}>
                      <div className="w-1/4">
                        <Image
                          src={product.imgs[0]}
                          alt={product.name}
                          width={58}
                          height={58}
                        />
                      </div>
                      <div className="w-[5/12] p-0">
                        <div className="mb-1 bg-white p-0">
                          <Menu.Item>
                            {({ close }) => (
                              <Link
                                href={`/products/${product._id}`}
                                className="link--green p-0 font-bold"
                                onClick={close}
                              >
                                {product.name}
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="mb-1">
                          <span className="mr-2">
                            {formatCurrency(product.price)}
                          </span>
                          <span>[{product.packing}]</span>
                        </div>
                        <div>
                          <span>SL: {product.qty}</span>
                        </div>
                      </div>
                      <div className="w-1/3 text-right font-bold">
                        <p>{formatCurrency(product.qty * product.price)}</p>
                      </div>
                      <span className="bot-0 absolute right-0 w-auto">
                        <span
                          className="flex items-center justify-center"
                          onClick={(e) =>
                            removeProductCart(customerID, productID)
                          }
                        ></span>
                      </span>
                    </div>
                  ))}
                </div>
                <Menu.Item
                  as={"div"}
                  className="mt-3 bg-white text-center md:mt-4"
                >
                  {({ close }) => (
                    <Link
                      href="/user/cart"
                      className="font-bold"
                      onClick={close}
                    >
                      Chi Tiết Giỏ Hàng
                    </Link>
                  )}
                </Menu.Item>
              </div>
            ) : (
              <div className="">
                Chưa có sản phẩm nào được thêm vào giỏ hàng!
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Cart;
