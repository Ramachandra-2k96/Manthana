/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true }, // Only needed if using static exports
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't attempt to load these server-only modules on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        process: false,
        path: false,
        stream: false,
        util: false,
        buffer: false,
      };
    }
    return config;
  },
  // Updated configuration
  serverExternalPackages: ['firebase-admin']
};

module.exports = nextConfig;
