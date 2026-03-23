/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/features',
        destination: '/capabilities',
        permanent: true
      },
      {
        source: '/verticals',
        destination: '/industries',
        permanent: true
      }
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90]
  }
};

module.exports = nextConfig;
