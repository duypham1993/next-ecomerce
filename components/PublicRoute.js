import { getLocalAccessToken } from "@/services/localStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PublicRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkLocal = () => {
      const token = getLocalAccessToken();
      if (token) {
        router.replace("/");
      }
    };
    checkLocal();
    window.addEventListener("storage", checkLocal);
    return () => window.removeEventListener("storage", checkLocal);
  }, []);

  return <>{children}</>;
};

export default PublicRoute;
