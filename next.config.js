/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  transpilePackages: ["lenis"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
