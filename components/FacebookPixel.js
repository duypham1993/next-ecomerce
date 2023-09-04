import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import * as pixel from "@/lib/fbpixel";

const FacebookPixel = () => {
  const [loaded, setLoaded] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    if (!loaded) return;

    pixel.pageview();
  }, [pathname, loaded]);

  return (
    <div>
      <Script
        id="fb-pixel"
        src="/scripts/pixel.js"
        // strategy="afterInteractive"
        type="text/partytown"
        onLoad={() => setLoaded(true)}
        data-pixel-id={pixel.FB_PIXEL_ID}
      />
    </div>
  );
};

export default FacebookPixel;
