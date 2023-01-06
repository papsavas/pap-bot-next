/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["server"],
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
