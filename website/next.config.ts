import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.5.1",
        port: "5000",
        pathname: "/api/files/**",
      },
    ],
  },
};

export default nextConfig;
