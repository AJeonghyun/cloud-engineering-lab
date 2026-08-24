import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cloud-engineering-lab-progress.vcxa.chatgpt.site'),
  title: 'Cloud Engineering Lab — Progress Dashboard',
  description: 'Cloud, Infrastructure, DevOps 실습 로드맵과 개인 진행도 대시보드',
  openGraph: {
    title: 'Cloud Engineering Lab',
    description: 'Build · Break · Diagnose · Recover · Document',
    type: 'website',
    images: [{ url: '/og.png', width: 1731, height: 909, alt: 'Cloud Engineering Lab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cloud Engineering Lab',
    description: 'Build · Break · Diagnose · Recover · Document',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
