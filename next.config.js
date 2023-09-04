/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  env: {
    URL_API: process.env.URL_API,
    OAUTH_GOOGLE_LOGIN_ID: process.env.OAUTH_GOOGLE_LOGIN_ID,
    OAUTH_GOOGLE_LOGIN_SECRET: process.env.OAUTH_GOOGLE_LOGIN_SECRET,
    NEXT_PUBLIC_FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
  },
};

module.exports = nextConfig;
