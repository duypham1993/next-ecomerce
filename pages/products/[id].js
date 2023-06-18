import CarouselImg from "@/components/CarouselImg/CarouselImg";
import Quantity from "@/components/Quantity/Quantity";
import { useAddToCart } from "@/hooks/useAddToCart";
import { getProductDetail } from "@/services/productApi/productApi";
import { formatCurrency } from "@/services/formatCurrency";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import SuccessNoti from "@/components/SuccessNoti/SuccessNoti";

const ProductDetail = ({ product }) => {
  const addToCart = useAddToCart();
  const [value, setValue] = useState(1);
  const [show, setShow] = useState(false);
  const { cart, isSubmitting } = useSelector((state) => state.cart);
  const qtyCart = cart?.products?.filter((item) => item._id === product._id)[0];
  const checkQty = qtyCart ? product.qty - qtyCart.qty : product.qty;
  const maxQty = checkQty < 0 ? 0 : checkQty;

  const handleClose = () => setShow(false);

  return (
    <div className="sm:my-4 md:my-5">
      <div className="container bg-white py-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-10 lg:gap-20">
          <div>
            {product.imgs?.length && (
              <CarouselImg arrImg={product.imgs} alt={product.name} />
            )}
          </div>
          <div className="lg:flex lg:justify-end">
            <div className="mt-3 mb-4 lg:w-5/6">
              <h3 className="mb-2 text-xl font-bold uppercase text-black">
                {product.name}
              </h3>
              <p className="mb-1">Mã tham chiếu: {product.sku}</p>
              <p className="mb-2">Bình luận ở phía dưới!</p>
              <p className="mt-1">{product.qty <= 0 && "TẠM THỜI HẾT HÀNG"}</p>
              <p className="mt-2 flex md:mt-4">
                <span className="pr-2 font-bold text-black">
                  {formatCurrency(product.price)}
                </span>
                <span className="self-end text-xs font-normal text-gray-500">
                  Đã gồm thuế
                </span>
              </p>
              <p className="text-red">[{product.packing}]</p>
              <div className="my-3 md:my-4">
                <p className="mb-2">SỐ LƯỢNG</p>
                <Quantity value={value} setValue={setValue} maxQty={maxQty} />
                <div className="mt-6">
                  {product.qty ? (
                    isSubmitting ? (
                      <button
                        disabled
                        className="btn--df btn--green btn-spinner w-full cursor-wait"
                      >
                        Loading
                      </button>
                    ) : (
                      <button
                        className="btn--df btn--green w-full py-2"
                        onClick={() => addToCart(product._id, value, setShow)}
                      >
                        <AiOutlineShoppingCart className="text-xl" />
                        <span className="pl-1">Cho vào giỏ hàng</span>
                      </button>
                    )
                  ) : (
                    <button
                      disabled
                      className="btn--df btn--green cursor-disabled w-full"
                    >
                      <span className="pl-1">Tạm thời hết hàng</span>
                    </button>
                  )}
                </div>
              </div>
              <div>
                <p>Mô tả ngắn:</p>
                <p>{product.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessNoti show={show} handleClose={handleClose} />
    </div>
  );
};

export const getServerSideProps = async ({ res, params }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=10"
  );

  const { id } = params;

  try {
    const product = await getProductDetail(id);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.log("err", error);
    return {
      notFound: true,
    };
  }
};

export default ProductDetail;
