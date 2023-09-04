import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import "@fontsource/faustina";
import { store } from "@/store/store";
import Loading from "@/components/Loading/Loading";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import * as fbq from "@/lib/fbpixel";
import { useRouter } from "next/router";
import { Partytown } from "@builder.io/partytown/react";
import { FB_PIXEL_ID } from "@/lib/fbpixel";
import Script from "next/script";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview();

    const handleRouteChange = () => {
      fbq.pageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <Partytown debug={true} forward={["fbq"]} />
        {/* Global Site Code Pixel - Facebook Pixel */}
        <Script
          id="fb-pixel"
          // strategy="afterInteractive"
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${FB_PIXEL_ID});
          `,
          }}
        />
        <Provider store={store}>
          <Layout>
            <Loading />
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </>
    );
  }
  return (
    <>
      <Partytown debug={true} forward={["fbq"]} />
      {/* Global Site Code Pixel - Facebook Pixel */}
      <Script
        id="fb-pixel"
        // strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${FB_PIXEL_ID});
          `,
        }}
      />
      <SessionProvider session={session}>
        <Provider store={store}>
          <Layout>
            <Loading />
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SessionProvider>
    </>
  );
}
