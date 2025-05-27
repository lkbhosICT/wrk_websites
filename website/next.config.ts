import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.5.4",
        port: "8081",
        pathname: "/api/files/**",
      },
      {
        protocol: "http",
        hostname: "10.10.5.4",
        port: "8081",
        pathname: "/api/converts/**",
      },
    ],
  },
};

export default nextConfig;
