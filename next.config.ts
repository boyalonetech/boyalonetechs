import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "media.istockphoto.com"],
  },
  reactStrictMode: true,
};

export default nextConfig;
