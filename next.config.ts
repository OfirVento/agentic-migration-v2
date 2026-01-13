import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/agentic-migration-v2' : '',
  assetPrefix: isProd ? '/agentic-migration-v2/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
