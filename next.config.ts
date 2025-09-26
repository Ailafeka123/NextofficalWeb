import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  // default-src 'self';
  // script-src 'self';
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              font-src 'self';
              connect-src 'self' https:;
              frame-ancestors 'none';
              object-src 'none';
              media-src 'self';
              base-uri 'self';
            `.replace(/\s{2,}/g, " ")

          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          }
        ]
      }
    ];
  }

};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
