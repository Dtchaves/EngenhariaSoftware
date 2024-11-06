import type { NextConfig } from "next";
import dotenv from 'dotenv'

dotenv.config({path: '../.env'})

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  }
};

export default nextConfig;
