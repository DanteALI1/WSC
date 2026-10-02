import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@wsc/ui', '@wsc/auth', '@wsc/config'],
};

export default nextConfig;
