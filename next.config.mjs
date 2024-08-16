/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/items/:id",
        destination: "/products/:id",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/codeitmall/**",
      },
    ],
  },

  sassOptions: {
    includePaths: [path.join(process.cwd(), "src", "styles")],
  },
};

export default nextConfig;
