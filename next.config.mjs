/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              font-src 'self' data: https://fonts.gstatic.com https://*.clerk.dev;
              script-src 'self' https://*.clerk.dev 'unsafe-inline';
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.clerk.dev;
              img-src 'self' data: https://*.clerk.dev https://randomuser.me;
              connect-src 'self' https://*.clerk.dev https://*.clerk.com;
              frame-src https://*.clerk.dev https://*.clerk.com;
            `.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
