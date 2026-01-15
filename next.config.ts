import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/goals',
        destination: 'https://the-goals-project.vercel.app',
      },
      {
        source: '/goals/:path*',
        destination: 'https://the-goals-project.vercel.app/:path*',
      },
    ];
  },
};

export default nextConfig;
