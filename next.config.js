/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Enable runtime environment variables for Coolify
  env: {
    GHOST_URL: process.env.GHOST_URL,
    GHOST_CONTENT_API_KEY: process.env.GHOST_CONTENT_API_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    CONTACT_FORM_ENDPOINT: process.env.CONTACT_FORM_ENDPOINT,
  },
  // Public runtime config (available on both client and server)
  publicRuntimeConfig: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://finarena.pl',
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Finarena',
  },
  // Server runtime config (server only)
  serverRuntimeConfig: {
    ghostUrl: process.env.GHOST_URL,
    ghostApiKey: process.env.GHOST_CONTENT_API_KEY,
    contactFormEndpoint: process.env.CONTACT_FORM_ENDPOINT,
  },
  images: {
    domains: ['localhost', 'cms.finarena.pl'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.finarena.pl',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
