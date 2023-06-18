import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { logout, updateUser } from "@/store/slices/authSlice";
import LayoutUser from "@/components/LayoutUser";
import { AiFillCloseCircle, AiOutlineSync } from "react-icons/ai";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const autoClose = setTimeout(handleClose, 2000);
    return () => clearTimeout(autoClose);
  }, [show]);

  const formik = useFormik({
    initialValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      gender: currentUser?.gender || "",
      isChangePW: false,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      dateOfBirth: moment(currentUser?.dateOfBirth).format("YYYY-MM-DD") || "",
      phoneNumber: currentUser?.phone || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(true),
      dateOfBirth: Yup.string().required(true),
      phoneNumber: Yup.string().min(10, true).required(true),
      isChangePW: Yup.boolean(),
      currentPassword: Yup.string().when("isChangePW", {
        is: true,
        then: () =>
          Yup.string()
            .required(true)
            .min(8, "Mật khẩu không được ít hơn 8 kí tự!"),
      }),
      newPassword: Yup.string().when("isChangePW", {
        is: true,
        then: () =>
          Yup.string()
            .required(true)
            .min(8, "Mật khẩu không được ít hơn 8 kí tự!"),
      }),
      confirmPassword: Yup.string().when("isChangePW", {
        is: true,
        then: () =>
          Yup.string()
            .oneOf([Yup.ref("password")], "Mật khẩu không khớp!")
            .required(true),
      }),
    }),
    onSubmit: (values, { setSubmitting }) => {
      let user;

      if (values.isChangePW) {
        user = {
          name: values.name,
          dateOfBirth: moment(values.dateOfBirth),
          gender: values.gender,
          phone: values.phoneNumber,
          currentPassword: values.currentPassword,
          password: values.newPassword,
        };
      } else {
        user = {
          name: values.name,
          dateOfBirth: moment(values.dateOfBirth),
          gender: values.gender,
          phone: values.phoneNumber,
        };
      }

      dispatch(updateUser({ id: currentUser._id, user: user }))
        .unwrap()
        .then(() => {
          // show notification and close after 2s
          setShow(true);

          if (user.isChangePW) {
            dispatch(logout());
          }

          setSubmitting(false);
        })
        .catch((error) => {
          formik.errors.currentPassword = error.password;
          setSubmitting(false);
        });
    },
  });
  return (
    <LayoutUser>
      <div className="flex justify-center bg-white shadow">
        <form
          className="w-full py-5 px-4 sm:w-9/12 md:w-7/12 lg:w-4/12"
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
          <div className="mb-3">
            <h5 className="fs-6 mb-2">Giới tính</h5>
            <div className="flex items-center">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={formik.handleChange}
                checked={"male" === formik.values.gender}
                className="cursor-pointer"
              />
              <label
                htmlFor="male"
                className="mr-3 cursor-pointer select-none pl-1"
              >
                Nam
              </label>

              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={formik.handleChange}
                checked={"female" === formik.values.gender}
                className="cursor-pointer"
              />
              <label
                htmlFor="female"
                className="mr-3 cursor-pointer select-none pl-1"
              >
                Nữ
              </label>

              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                onChange={formik.handleChange}
                checked={"other" === formik.values.gender}
                className="cursor-pointer"
              />
              <label
                htmlFor="other"
                className="mr-3 cursor-pointer select-none pl-1"
              >
                Khác
              </label>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-float">
              <input
                id="name"
                type="text"
                placeholder="Họ và tên"
                className={
                  formik.touched.name && formik.errors.name
                    ? "!border-red-100"
                    : ""
                }
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                autoComplete="off"
              />
              <label
                htmlFor="name"
                className={
                  formik.touched.name && formik.errors.name
                    ? "!text-red-100"
                    : ""
                }
              >
                Họ và tên
              </label>
            </div>
          </div>

          <div className="mb-3">
            <div className="form-float">
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                placeholder="Ngày sinh"
                className={
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? "!border-red-100"
                    : ""
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth}
                autoComplete="off"
              />
              <label
                htmlFor="dateOfBirth"
                className={
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? "!text-red-100"
                    : ""
                }
              >
                Ngày sinh
              </label>
            </div>
          </div>

          <div className="mb-3">
            <div className="form-float">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="Số điện thoại"
                className={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "!border-red-100"
                    : ""
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                autoComplete="off"
              />
              <label
                htmlFor="phoneNumber"
                className={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "!text-red-100"
                    : ""
                }
              >
                Số điện thoại
              </label>
            </div>
          </div>

          <div className="mb-3">
            <div className="form-float">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                disabled
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <div className="mb-3">
            <div className="form-float relative">
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="Mật khẩu"
                className={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                    ? "!border-red-100"
                    : ""
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentPassword}
                autoComplete="new-password"
                disabled={!formik.values.isChangePW}
              />
              <label
                htmlFor="currentPassword"
                className={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                    ? "!text-red-100"
                    : ""
                }
              >
                Mật khẩu
              </label>
              {formik.touched.currentPassword &&
                formik.errors.currentPassword && (
                  <p className="text-red fs-85">
                    {formik.errors.currentPassword}
                  </p>
                )}
              <span className="absolute right-0 top-1/2 min-w-[108px] -translate-y-1/2 text-right text-green underline">
                <label
                  htmlFor="isChangePW"
                  className="inline-flex cursor-pointer select-none items-center justify-end"
                >
                  {formik.values.isChangePW ? (
                    <>
                      <AiFillCloseCircle />
                      <span className="pl-1 pr-2">Huỷ</span>
                    </>
                  ) : (
                    <>
                      <AiOutlineSync />
                      <span className="pl-1 pr-2">Đổi mật khẩu</span>
                    </>
                  )}
                </label>
                <input
                  type="checkbox"
                  id="isChangePW"
                  name="isChangePW"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  hidden
                />
              </span>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              formik.values.isChangePW
                ? "h-[136px] opacity-100"
                : "h-0 opacity-0"
            }`}
          >
            <div id="changePW">
              <div className="mb-3">
                <div className="form-float">
                  <input
                    id="newPassword"
                    type="password"
                    placeholder="Mật khẩu mới"
                    className={
                      formik.touched.newPassword && formik.errors.newPassword
                        ? "!border-red-100"
                        : ""
                    }
                    name="newPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                    autoComplete="new-password"
                  />
                  <label
                    htmlFor="newPassword"
                    className={
                      formik.touched.newPassword && formik.errors.newPassword
                        ? "!text-red-100"
                        : ""
                    }
                  >
                    Mật khẩu mới
                  </label>

                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <p className="text-red fs-85">
                      {formik.errors.newPassword}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <div className="form-float">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    className={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "!border-red-100"
                        : ""
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    autoComplete="new-password"
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "!text-red-100"
                        : ""
                    }
                  >
                    Xác nhận mật khẩu
                  </label>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="text-red fs-85">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>

          {formik.isSubmitting ? (
            <button
              disabled
              className="btn--df btn--green btn-spinner min-h-[46px] w-full cursor-wait"
              type="submit"
            >
              <div
                className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </button>
          ) : (
            <button
              className="btn--df btn--green mt-2 w-full py-3 uppercase"
              type="submit"
            >
              Lưu
            </button>
          )}
        </form>
      </div>
    </LayoutUser>
  );
};

export default Profile;
