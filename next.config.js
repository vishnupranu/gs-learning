/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: [
      'images.unsplash.com',
      'images.pexels.com',
      'cdn.pexels.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'via.placeholder.com',
      'picsum.photos',
      'i.pravatar.cc',
      'api.dicebear.com',
      'www.gravatar.com',
      'www.gsgroups.net',       // GS Groups brand logo
      'guidesoftitsolutions.com', // production CDN
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: process.env.CORS_ORIGIN || '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,PATCH,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },

  async rewrites() {
    return [];
  },

  experimental: {
    serverComponentsExternalPackages: ['nodemailer'],
  },
};

module.exports = nextConfig;
