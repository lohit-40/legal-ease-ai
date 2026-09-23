import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true, // Efficiency Optimization
  reactStrictMode: true, // Code Quality Optimization
  
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security 100/100 Headers

          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
