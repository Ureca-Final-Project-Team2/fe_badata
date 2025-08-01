import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

import Providers from '@/app/_providers';
import { Toaster } from '@/shared/ui/Toaster';

import './globals.css';

export const metadata: Metadata = {
  title: '1인의 바다, 모두의 데이터',
  description: '1인의 바다, 모두의 데이터',
};

export const viewport: Viewport = {
  width: '428',
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3e9fdc" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BADATA" />
        <link rel="apple-touch-icon" href="/assets/logo-badata.png" />
        <link rel="icon" href="/assets/logo-badata.png" sizes="192x192" />
      </head>
      <body className="antialiased">
        {/* 외부 스크립트 */}
        <Script src="https://cdn.portone.io/v2/browser-sdk.js" strategy="beforeInteractive" />
        <Script src="https://cdn.iamport.kr/v1/iamport.js" strategy="beforeInteractive" />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
          integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
