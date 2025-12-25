import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: '/:path*', // Matches all paths
        destination: 'https://shore.gitam.edu/:path*', // Forwards to new domain, keeping the path
        permanent: false, // Keep false for now (307), change to true (308) after testing
      },
    ]
  },
  /* config options here */
};

export default nextConfig;
