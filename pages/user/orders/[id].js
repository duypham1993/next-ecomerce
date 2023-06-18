import moment from "moment";
import { AiOutlineLeft, AiFillCheckCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getCurrentOrder } from "@/services/orderApi/orderApi";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";
import { formatCurrency } from "@/services/formatCurrency";
import LayoutUser from "@/components/LayoutUser";

const arrTitle = ["STT", "Sản phẩm", "Số lượng", "Đơn giá", "Tiền hàng"];

const OrderDetail = () => {
  const router = useRouter();
  const { data: currentOrder, isLoading } = useSWR(
    router.isReady ? router.query.id : null,
    getCurrentOrder
  );

  return (
    <LayoutUser>
      {isLoading ? (
        <Loading />
      ) : (
        currentOrder &&
        Object.keys(currentOrder).length && (
          <div className="bg-white shadow">
            <div className="border-b">
              <div className="container">
                <div className="flex items-center py-3">
                  <div className="w-1/3 px-4">
                    <Link
                      href="/user/orders"
                      className="link--green inline-flex items-center uppercase"
                    >
                      <AiOutlineLeft className="mr-1 flex text-base" />
                      <span>Trở lại</span>
                    </Link>
                  </div>
                  <div className="w-2/3 px-4 text-end uppercase">
                    <span>Mã đơn hàng: {currentOrder.codeOrder}</span>
                    <span className="px-2">|</span>
                    <span>
                      {
                        currentOrder.status[currentOrder.status.length - 1]
                          .title
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 md:mt-4">
              <div className="container">
                <h5 className="px-4 text-xl">Địa Chỉ Nhận Hàng</h5>
                <div className="my-3 flex md:my-4">
                  <div className="border-r px-4 md:w-1/3">
                    <div className="mb-3 md:mb-0">
                      <p>{currentOrder.address.name}</p>
                      <p>{currentOrder.address.phone}</p>
                      <p>{`${currentOrder.address.address.street}, ${currentOrder.address.address.wards}, ${currentOrder.address.address.district}, ${currentOrder.address.address.city}`}</p>
                    </div>
                  </div>
                  <div className="px-4 md:w-2/3">
                    {[...currentOrder.status]
                      .reverse()
                      .map((status, index, arr) => (
                        <div key={index} className="flex items-center">
                          <div
                            className={
                              index + 1 === arr.length
                                ? "mr-2 py-1"
                                : "relative mr-2 py-1 after:absolute after:top-1/2 after:left-1/2 after:h-full after:w-[1px] after:-translate-x-1/2 after:translate-y-0 after:bg-gray-200 after:content-['']"
                            }
                          >
                            <AiFillCheckCircle className="text-gray-200" />
                          </div>
                          <div className="mr-2 py-1">
                            {moment(status.time).format("hh:mm DD-MM-YYYY")}
                          </div>
                          <div className="py-1">{status.title}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="container">
                <table className="min-w-full border md:mb-4">
                  <thead>
                    <tr>
                      {arrTitle.map((item, index) =>
                        index ? (
                          <th key={index} className="border p-2">
                            {item}
                          </th>
                        ) : (
                          <th
                            key={index}
                            className="w-0 border p-2 text-center"
                          >
                            {item}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrder.products.map((product, index) => (
                      <tr key={index}>
                        <td className="border p-2 text-center">{index + 1}</td>
                        <td className="border p-2">{product.name}</td>
                        <td className="border p-2 text-center">
                          {product.qty}
                        </td>
                        <td className="border p-2 text-center">
                          {formatCurrency(product.price)}
                        </td>
                        <td className="border p-2 text-center">
                          {formatCurrency(product.qty * product.price)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} className="border p-2 text-center">
                        Phí ship
                      </td>
                      <td className="border p-2 text-center">
                        {formatCurrency(currentOrder.shippingFee)}
                      </td>
                    </tr>
                    <tr className="font-bold">
                      <td colSpan={4} className="border p-2 text-center">
                        Tổng tiền
                      </td>
                      <td className="border p-2 text-center">
                        {formatCurrency(
                          currentOrder.shippingFee + currentOrder.amount
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      )}
    </LayoutUser>
  );
};

export default OrderDetail;
