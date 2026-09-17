import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Anak proyek berada di dalam folder parent yang berantakan (E:\ALL PROJECT RIDHO).
  // Paksa Next memakai folder project ini sebagai tracer root agar tidak memindai
  // seluruh sibling project saat build (menyebabkan hang).
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;