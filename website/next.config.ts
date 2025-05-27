import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "go_api",
        port: "8081",
        pathname: "/api/files/**",
      },
      {
        protocol: "http",
        hostname: "go_api",
        port: "8081",
        pathname: "/api/converts/**",
      },
    ],
  },
};

export default nextConfig;
