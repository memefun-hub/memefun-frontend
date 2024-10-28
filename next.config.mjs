import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.iplaysoft.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(import.meta.url, 'styles')],
  },
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
  ],
  env: {
    APP_ENV: process.env.APP_ENV,
    ICP_HOST: process.env.ICP_HOST,
    MEME_CANISTER_ID: process.env.MEME_CANISTER_ID,
    LEDGER_CANISTER_ID: process.env.LEDGER_CANISTER_ID,
    PINATA_JWT: process.env.PINATA_JWT,
    PINATA_PRIVATE_GATEWAY: process.env.PINATA_PRIVATE_GATEWAY,
    PINATA_PUBLIC_GATEWAY: process.env.PINATA_PUBLIC_GATEWAY,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
