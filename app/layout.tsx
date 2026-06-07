import type {Metadata} from 'next';
import { Noto_Serif, Manrope, Noto_Naskh_Arabic } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { Analytics } from '@vercel/analytics/next';

const notoSerif = Noto_Serif({ 
  subsets: ['latin'], 
  variable: '--font-headline',
  weight: ['400', '700'],
  display: 'swap',
});

const manrope = Manrope({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://doua.novaskill.tech'),
  title: 'Mon Dou‘a Adéquat',
  description: 'L’application qui te conseille le bon dou‘a au bon moment.',
  icons: {
    icon: [
      { url: '/favicon1.png' },
      { url: '/app_logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon1.png',
    apple: [
      { url: '/app_logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Mon Dou‘a Adéquat',
    description: 'Trouvez l’invocation qui correspond exactement à vos ressentis en langage naturel, avec des sources authentiques.',
    url: 'https://doua.novaskill.tech',
    siteName: 'Mon Dou‘a',
    images: [
      {
        url: 'https://doua.novaskill.tech/app_banner_og.jpg',
        width: 1200,
        height: 630,
        alt: 'Mon Dou‘a - Invocations & Assistant Spirituel',
      },
      {
        url: 'https://doua.novaskill.tech/app_logo_og.jpg',
        width: 300,
        height: 300,
        alt: 'Mon Dou‘a Logo',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mon Dou‘a Adéquat',
    description: 'L’application qui te conseille le bon dou‘a au bon moment.',
    images: ['https://doua.novaskill.tech/app_banner_og.jpg', 'https://doua.novaskill.tech/app_logo_og.jpg'],
  },
};



export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" 
        />
      </head>
      <body className={`${notoSerif.variable} ${manrope.variable} ${notoNaskhArabic.variable} font-body`} suppressHydrationWarning>
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  );
}
