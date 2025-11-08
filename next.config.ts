import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/mirrors',
        destination: '/mirror',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
