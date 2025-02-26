import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['127.0.0.1','178.128.115.99'], // Add the external domain for images
  },
    // Ensure the build is standalone
    output: 'standalone',
};

export default nextConfig;
