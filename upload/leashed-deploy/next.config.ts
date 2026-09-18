import type { NextConfig } from "next";

const backendUrl =
  process.env.BACKEND_URL ?? "http://127.0.0.1:8081";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
