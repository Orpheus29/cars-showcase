/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['cdn.imagin.studio'],
    remotePatterns: [
      {
        hostname: 'cdn.imagin.studio',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig;
