import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import FormLogin from "@/components/FormLogin/FormLogin";
import { useRouter } from "next/router";
import Link from "next/link";
import { login } from "@/store/slices/authSlice";
import PublicRoute from "@/components/PublicRoute";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: yup.object({
      email: yup.string().email("Email không hợp lệ!").required(true),
      password: yup.string().min(8, true).required(true),
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(login(values))
        .unwrap()
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          if (error.password) formLogin.errors.password = error.password;
          if (error.email) formLogin.errors.email = error.email;
          setSubmitting(false);
        });
    },
  });
  return (
    <PublicRoute>
      <main className="my-4 md:my-10">
        <div className="container">
          <div className="flex w-full justify-center">
            <div className="w-full sm:w-8/12 md:w-5/12">
              <div className="bg-white p-5 pb-4">
                <FormLogin formik={formLogin} />
              </div>
              <div className="bg-white pb-2 text-center">
                <Link href="/forgot-password" className="link-df link-df--gray">
                  QUÊN MẬT KHẨU
                </Link>
              </div>
              <div className="bg-white pb-4 text-center md:pb-5">
                <Link href="/register" className="link-df link-df--gray">
                  ĐĂNG KÍ TÀI KHOẢN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PublicRoute>
  );
};

export default LoginPage;
