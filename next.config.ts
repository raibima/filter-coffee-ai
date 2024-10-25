import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    dynamicIO: true,
    serverComponentsHmrCache: true,
  },
};

export default nextConfig;
