/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["server"],
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["cdn.discordapp.com"],
  },
};

module.exports = nextConfig;
