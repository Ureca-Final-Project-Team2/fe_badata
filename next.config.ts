import path from "path";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@lib": path.resolve(__dirname, "./src/shared/lib"),
      "@hooks": path.resolve(__dirname, "./src/shared/hooks"),
      "@types": path.resolve(__dirname, "./src/shared/types"),
      "@constants": path.resolve(__dirname, "./src/shared/constants"),
      "@utils": path.resolve(__dirname, "./src/shared/utils"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    };
    return config;
  },
};

export default nextConfig;
