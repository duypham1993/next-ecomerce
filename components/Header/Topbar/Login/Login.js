import {
  getLocalAccessToken,
  getLocalCurrentUser,
} from "@/services/localStorage";

import { useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import * as yup from "yup";
import FormLogin from "@/components/FormLogin/FormLogin";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  AiFillCaretDown,
  AiFillFacebook,
  AiOutlineClose,
  AiOutlineLogin,
  AiOutlineUser,
  AiOutlineGooglePlus,
  AiOutlineLogout,
} from "react-icons/ai";
import {
  login,
  loginWithFacebook,
  loginWithGoogle,
  logout,
  syncCurrentUser,
} from "@/store/slices/authSlice";
import { clearCart } from "@/store/slices/cartSlice";

export default function Login() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const syncLocalstage = () => {
      const token = getLocalAccessToken();
      if (token) {
        dispatch(syncCurrentUser(getLocalCurrentUser()));
      }
    };
    window.addEventListener("storage", syncLocalstage);
    return () => {
      window.removeEventListener("storage", syncLocalstage);
    };
  }, []);

  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: yup.object({
      email: yup.string().email("Email không hợp lệ!").required(true),
      password: yup.string().min(8, true).required(true),
      rememberMe: yup.boolean(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(login(values))
        .unwrap()
        .then(() => {
          setShow(false);
          setSubmitting(false);
        })
        .catch((error) => {
          formLogin.errors.password = error.password;
          formLogin.errors.email = error.email;
          setSubmitting(false);
        });
    },
  });

  const handleLogout = async () => {
    await dispatch(clearCart());
    dispatch(logout());
  };

  const loginFacebook = (w, h) => {
    dispatch(loginWithFacebook(w, h))
      .unwrap()
      .then((data) => {
        const y = window.top.outerHeight / 2 + window.top.screenY - h / 2;
        const x = window.top.outerWidth / 2 + window.top.screenX - w / 2;
        window.open(
          data.url,
          "_blank",
          `width=${w}, height=${h}, top=${y}, left=${x}`
        );
      });
  };

  const loginGoogle = (w, h) => {
    dispatch(loginWithGoogle(w, h))
      .unwrap()
      .then((data) => {
        const y = window.top.outerHeight / 2 + window.top.screenY - h / 2;
        const x = window.top.outerWidth / 2 + window.top.screenX - w / 2;
        window.open(
          data.url,
          "_blank",
          `width=${w}, height=${h}, top=${y}, left=${x}`
        );
      });
  };
  return (
    <>
      {currentUser && Object.keys(currentUser).length > 0 ? (
        // Logged in
        <div className="flex items-center justify-end">
          <button
            className="mr-4 inline-flex items-center text-xs text-white hover:text-yellow-200"
            onClick={() => handleLogout()}
          >
            <AiOutlineLogout className="" />
            <span className="pl-1">Đăng Xuất</span>
          </button>
          <Link
            href="/user/profile"
            className="inline-flex items-center text-xs text-white hover:text-yellow-200"
          >
            <AiOutlineUser className="" />
            <span className="pl-1">{currentUser.name}</span>
          </Link>
        </div>
      ) : (
        <>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="transtion inline-flex w-full items-center justify-center text-white duration-200 hover:text-yellow-200">
                <AiOutlineLogin className="flex text-sm" />
                <span className="mx-1">Tài khoản của bạn</span>
                <AiFillCaretDown className="flex text-xs" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-[1000] mt-2 w-52 origin-top-right border border-gray-200 bg-white p-4 shadow focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "text-green" : "text-gray-100"
                        } btn--df btn--green w-full cursor-pointer py-1 uppercase`}
                        onClick={() => handleShow()}
                      >
                        đăng nhập
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="p-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="#"
                        className={`${
                          active ? "text-green" : "text-gray-600"
                        } w-full py-1 pl-4`}
                      >
                        Quên mật khẩu?
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="p-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="#"
                        className={`${
                          active ? "text-green" : "text-gray-600"
                        } w-full cursor-pointer py-1 pl-4 uppercase`}
                      >
                        đăng kí tài khoản
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="p-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "opacity-80" : "opacity-100"
                        } flex w-full cursor-pointer items-center bg-facebook py-1 pl-4 text-white`}
                        onClick={() => loginFacebook(500, 600)}
                      >
                        <AiFillFacebook className="mr-1 inline-flex text-base" />
                        <span className="uppercase">đăng nhập</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="p-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "opacity-80" : "opacity-100"
                        } flex w-full cursor-pointer items-center bg-google py-1 pl-4 text-white`}
                        onClick={() => loginGoogle(500, 600)}
                      >
                        <AiOutlineGooglePlus className="mr-1 inline-flex text-base" />
                        <span className="uppercase">Đăng nhập</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25"></div>
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white text-left align-middle shadow-xl transition-all">
                      <div className="relative bg-white shadow">
                        <div className="px-10 pt-6 text-center">
                          <AiOutlineUser className="mx-auto text-2xl" />
                          <p className="text-xl">ĐĂNG NHẬP</p>
                        </div>
                        <button
                          className="absolute right-0 top-0 bg-black p-2 text-white"
                          onClick={() => handleClose()}
                        >
                          <AiOutlineClose className="flex" />
                        </button>
                        <div className="px-10 py-4 text-center">
                          <FormLogin formik={formLogin} />
                        </div>
                        <div className="bg-gray-100 px-10 py-4 text-center">
                          <Link
                            href="#"
                            className="my-1 inline-block py-1 hover:text-green"
                          >
                            BẠN QUÊN MẬT KHẨU?
                          </Link>
                          <p className="my-2">BẠN CHƯA CÓ TÀI KHOẢN?</p>
                          <Link
                            href="/register"
                            className="inline-block w-full border border-green py-2 text-xs text-red-100 hover:text-green"
                            onClick={() => handleClose()}
                          >
                            ẤN VÀO ĐÂY ĐỂ TẠO MỚI
                          </Link>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
    </>
  );
}
