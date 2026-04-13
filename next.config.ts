import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  serverExternalPackages: ["pino", "pino-pretty", "hono-pino/debug-log"],
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "cloudflarestorage.com",
      },
    ],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    authInterrupts: true,
    typedEnv: true,
    optimizeCss: true,
  },
  reactCompiler: false,
  allowedDevOrigins: ["mrlectus.local"],
  cacheComponents: false,
};

export default nextConfig;
