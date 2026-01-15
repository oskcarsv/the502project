import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/goals',
        destination: 'https://the-goals-project.vercel.app/goals',
      },
      {
        source: '/goals/:path*',
        destination: 'https://the-goals-project.vercel.app/goals/:path*',
      },
    ];
  },
};

export default nextConfig;
