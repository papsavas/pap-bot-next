/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["server"],
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ["cdn.discordapp.com"],
  },
};

module.exports = nextConfig;
