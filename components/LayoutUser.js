import Link from "next/link";
import { useRouter } from "next/router";
import {
  AiOutlineUser,
  AiOutlineEnvironment,
  AiOutlineOrderedList,
} from "react-icons/ai";
import PrivateRoute from "./PrivateRoute";

const LayoutUser = ({ children }) => {
  const router = useRouter();

  return (
    <PrivateRoute>
      <div className="profile-page my-4 md:my-8">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full md:w-3/12 lg:w-2/12">
              <nav className="flex flex-wrap justify-center px-4 md:flex-col md:justify-start">
                <Link
                  href="/user/profile"
                  className={`flex w-1/2 items-center justify-center py-3 sm:w-4/12 md:w-full md:p-4 ${
                    router.pathname.includes("/user/profile") &&
                    "bg-green text-white"
                  }`}
                >
                  <AiOutlineUser className="text-lg" />
                  <span className="pl-1">Tài khoản</span>
                </Link>
                <Link
                  href="/user/addresses"
                  className={`flex w-1/2 items-center justify-center py-3 sm:w-4/12 md:w-full md:p-4 ${
                    router.pathname.includes("/user/addresses") &&
                    "bg-green text-white"
                  }`}
                >
                  <AiOutlineEnvironment className="text-lg" />
                  <span className="pl-1">Quản lí địa chỉ</span>
                </Link>
                <Link
                  href="/user/orders"
                  className={`flex w-1/2 items-center justify-center py-3 sm:w-4/12 md:w-full md:p-4 ${
                    router.pathname.includes("/user/orders") &&
                    "bg-green text-white"
                  }`}
                >
                  <AiOutlineOrderedList className="text-lg" />
                  <span className="pl-1">Lịch sử đơn hàng</span>
                </Link>
              </nav>
            </div>
            <div className="relative w-full md:w-9/12 lg:w-10/12">
              <div className="px-4">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default LayoutUser;
