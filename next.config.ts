import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qwumsqzcfjurbwrjxuoe.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // images: {
  //   domains: ["images.unsplash.com", "media.istockphoto.com"],
  // },
  reactStrictMode: true,
};

export default nextConfig;
