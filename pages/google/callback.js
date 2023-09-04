import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { loginGoogleCallback } from "@/store/slices/authSlice";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const code = router.query;
  useEffect(() => {
    code &&
      dispatch(loginGoogleCallback(code))
        .unwrap()
        .then(() => {
          window.close();
        });
  }, [code, dispatch]);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default GoogleCallback;
