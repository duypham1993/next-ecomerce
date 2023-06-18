import { useEffect, useState } from "react";

const useViewport = () => {
  const [width, setWidth] = useState(0);
  const isMd = width >= 768;
  const handleWindowResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width, isMd };
};

export default useViewport;
