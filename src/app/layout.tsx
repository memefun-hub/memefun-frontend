import { Resize } from '@/components/resize';
import '@/styles/global.scss';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Meme',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Resize></Resize>
        {children}
        <GoogleAnalytics gaId="G-XZ5MJ4DVJT" />
      </body>
    </html>
  );
}
