import { useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";
import { formatCurrency } from "@/services/formatCurrency";
import Loading from "@/components/Loading/Loading";
import LayoutUser from "@/components/LayoutUser";
import useSWR from "swr";
import { getUserOrders } from "@/services/orderApi/orderApi";

const arrHeader = [
  "Mã ĐH",
  "Thời gian",
  "Địa chỉ",
  "Ship",
  "Tiền hàng",
  "Lưu ý",
  "Trạng thái",
  "",
];

const Orders = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { data: orders, error } = useSWR(
    currentUser?._id ? currentUser._id : null,
    getUserOrders
  );

  return (
    <LayoutUser>
      {!orders ? (
        <Loading />
      ) : orders.length ? (
        <div className="orders overflow-x-auto bg-white p-3 shadow-sm">
          <table className="m-0 min-w-full border">
            <thead>
              <tr>
                {arrHeader.map((item, index) => (
                  <th key={index} className="border py-2 px-3 align-middle">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap border py-2 px-3">
                    {order.codeOrder}
                  </td>
                  <td className="whitespace-nowrap border py-2 px-3">
                    {moment(order.status[order.status.length - 1].time).format(
                      "hh:mm DD-MM-YYYY"
                    )}
                  </td>
                  <td className="whitespace-nowrap border py-2 px-3">{`${order.address.address.street}, ${order.address.address.wards}, ${order.address.address.district}, ${order.address.address.city}`}</td>
                  <td className="whitespace-nowrap border py-2 px-3">
                    {formatCurrency(order.shippingFee)}
                  </td>
                  <td className="whitespace-nowrap border py-2 px-3">
                    {formatCurrency(order.amount)}
                  </td>
                  <td className="whitespace-nowrap border py-2 px-3">
                    {order.note}
                  </td>
                  <td className="whitespace-nowrap border py-2 px-3">
                    {order.status[order.status.length - 1].title}
                  </td>
                  <td className="whitespace-nowrap border py-2 px-3">
                    <Link
                      href={`orders/${order._id}`}
                      className="link--green underline"
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="orders bg-white p-3 shadow-sm">
          Bạn chưa đặt đơn hàng nào gần đây!
        </div>
      )}
    </LayoutUser>
  );
};

export default Orders;
