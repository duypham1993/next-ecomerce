import AddAddress from "@/components/Address/AddAddress/AddAddress";
import DeliveryAddress from "@/components/Address/DeliveryAddress/DeliveryAddress";
import Loading from "@/components/Loading/Loading";
import { formatCurrency } from "@/services/formatCurrency";
import { getAddressList } from "@/store/slices/addressSlice";
import { deleteCart, getCart } from "@/store/slices/cartSlice";
import { createOrder } from "@/store/slices/orderSlice";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
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
  const shipping = cartTotal ? 45000 : 0;
  const { addressList, selectedAddress, isLoading } = useSelector(
    (state) => state.address
  );
  const addressDefault = addressList?.filter(
    (address) => address.isDefault === true
  )[0];
  const orderAddress = Object.keys(selectedAddress).length
    ? selectedAddress
    : addressDefault;
  const { isSubmitting } = useSelector((state) => state.order);
  const [errorApi, setErrorApi] = useState({});

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (Object.keys(cart).length) {
      dispatch(getAddressList(currentUser._id));
    } else {
      router.replace("/user/cart");
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnSubmit = () => {
    const order = {
      customerID: currentUser?._id,
      products: cart.products,
      shippingFee: shipping,
      amount: cartTotal,
      address: {
        _id: orderAddress._id,
        name: orderAddress.name,
        address: {
          city: orderAddress.address.city,
          district: orderAddress.address.district,
          wards: orderAddress.address.wards,
          street: orderAddress.address.street,
        },
        phone: orderAddress.phone,
        note: orderAddress.note,
      },
    };

    dispatch(createOrder(order))
      .unwrap()
      .then(() => {
        dispatch(deleteCart(cart._id));
        router.replace("/user/orders");
      })
      .catch((error) => {
        setErrorApi(error);
        handleShow();
      });
  };

  const submitError = () => {
    handleClose();
    if (errorApi.reload) {
      window.location.reload();
    }
    if (errorApi.backToCart) {
      router.replace("/user/cart");
      dispatch(getCart(currentUser._id));
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="py-5">
          <div className="container">
            <div className="flex">
              <div className="px-3 lg:order-2 lg:w-5/12">
                <ul className="border bg-white">
                  <li className="px-4 md:py-4">
                    <div className="flex justify-between">
                      <span>CHI TIẾT ĐƠN HÀNG</span>
                      <span>{cartCount} SẢN PHẨM</span>
                    </div>
                  </li>
                  {cart.products?.map((product, index) => {
                    return (
                      <li key={index} className="border-t px-4 md:py-4">
                        <div className="flex justify-between">
                          <div className="flex">
                            <Image
                              src={product.imgs[0]}
                              alt={product.name}
                              width={50}
                              height={50}
                            />
                            <div className="text-break px-3">
                              <p className="mb-1">
                                <span>{product.name} </span>
                                <span className="font-bold">
                                  x {product.qty}
                                </span>
                              </p>
                              <p>[{product.packing}]</p>
                            </div>
                          </div>
                          <div>{formatCurrency(product.price)}</div>
                        </div>
                      </li>
                    );
                  })}
                  <li className="border-t px-4 md:py-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span>Tổng tiền hàng:</span>
                      <span>{formatCurrency(cartTotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Phí vận chuyển:</span>
                      <span>{formatCurrency(shipping)}</span>
                    </div>
                  </li>
                  <li className="border-t px-4 md:py-4">
                    <div className="flex items-center justify-between font-bold">
                      <span>Tổng thanh toán:</span>
                      <span>{formatCurrency(cartTotal + shipping)}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="px-3 lg:w-7/12">
                <div className="border bg-white p-3">
                  <h5 className="pb-2">ĐỊA CHỈ NHẬN HÀNG</h5>
                  <div>
                    {addressList.length ? (
                      <>
                        <DeliveryAddress address={orderAddress} />
                      </>
                    ) : (
                      <AddAddress />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end px-3">
              <button
                className="btn--df btn--green min-h-[38px] min-w-[94px] py-2 px-3 align-middle"
                onClick={(e) => handleOnSubmit()}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div
                    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                ) : (
                  "ĐẶT HÀNG"
                )}
              </button>
            </div>
          </div>
          <Transition appear show={show} as={Fragment}>
            <div className="relative z-10">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="w-full max-w-sm transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow transition-all">
                      <h3 className="text-center text-lg font-medium leading-6">
                        Tạo đơn hàng thất bại!
                      </h3>
                      <div className="text-center">
                        {errorApi?.other}
                        <div className="flex justify-center pt-4">
                          <button
                            className="btn--df btn--green px-3 py-2"
                            onClick={() => submitError()}
                          >
                            Xác nhận
                          </button>
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      )}
    </>
  );
};

export default Checkout;
