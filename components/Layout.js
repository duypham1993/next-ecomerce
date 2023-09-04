import {
  getLocalAccessToken,
  getLocalCurrentUser,
} from "@/services/localStorage";
import { syncCurrentUser } from "@/store/slices/authSlice";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FacebookPixel from "./FacebookPixel";

const Header = dynamic(() => import("./Header/Header"));
const Footer = dynamic(() => import("./Footer/Footer"));

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  useEffect(() => {
    const token = getLocalAccessToken();
    if (token) {
      if (!currentUser?.isActive) {
        dispatch(syncCurrentUser(getLocalCurrentUser()));
      }
    }
  }, []);

  return (
    <>
      <Header />
      <main>{children}</main>
      <FacebookPixel />
      <Footer />
    </>
  );
}
