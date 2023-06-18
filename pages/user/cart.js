import ProductItemCart from "@/components/Cart/ProductItemCart";
import PrivateRoute from "@/components/PrivateRoute";
import { formatCurrency } from "@/services/formatCurrency";
import Link from "next/link";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";

const CartPage = () => {
  const { cart, isLoading } = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.auth.currentUser);
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
  const customerID = currentUser._id;
  const shipping = cartTotal ? 45000 : 0;

  return (
    <PrivateRoute>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="cart-page pt-4 pb-4">
          <div className="container">
            <div className="flex">
              <div className="px-4 md:w-2/3">
                <div className="border border-gray-200 bg-white">
                  <div className="p-4 text-lg font-semibold">GIỎ HÀNG</div>
                  {cart.products?.length ? (
                    cart.products.map((product, index) => {
                      return (
                        <div
                          key={index}
                          className="border-t border-gray-200 px-4 py-5"
                        >
                          <ProductItemCart
                            customerID={customerID}
                            product={product}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4">
                      <span>Chưa có sản phẩm nào được thêm vào giỏ hàng!</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="px-4 md:w-1/3">
                <div className="border border-gray-200 bg-white">
                  <div className="p-4">
                    <div className="flex justify-between">
                      <span>{cartCount} sản phẩm</span>
                      <span className="text-red">
                        {formatCurrency(cartTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vận chuyển</span>
                      <span className="text-red">
                        {formatCurrency(shipping)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-red">
                        {formatCurrency(cartTotal + shipping)}
                      </span>
                    </div>
                  </div>
                  {cart.products?.length ? (
                    <div className="pt-3 pb-3 text-center">
                      <Link
                        href="/user/checkout"
                        className="btn--df btn--green text-reset inline-block py-2 px-3"
                      >
                        THANH TOÁN
                      </Link>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PrivateRoute>
  );
};

export default CartPage;
