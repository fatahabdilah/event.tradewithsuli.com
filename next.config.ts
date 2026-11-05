import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Lets other devices on the local network open the dev server.
  allowedDevOrigins: ["192.168.110.30"],
  images: {
    qualities: [75, 90],
    // AVIF first (smallest), WebP for browsers without AVIF support.
    formats: ["image/avif", "image/webp"],
    // Assets in /public never change in place, so optimized copies can be cached for 30 days.
    minimumCacheTTL: 2592000,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
