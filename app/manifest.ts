import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mon Dou‘a Adéquat',
    short_name: 'Mon Dou‘a',
    description: 'L’application qui te conseille le bon dou‘a au bon moment.',
    start_url: '/app',
    display: 'standalone',
    background_color: '#f0ede5',
    theme_color: '#004643',
    icons: [
      {
        src: '/app_logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/app_logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/app_logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
