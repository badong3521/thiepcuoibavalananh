import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  distDir: process.env.BUILD_DIR || '.next',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
