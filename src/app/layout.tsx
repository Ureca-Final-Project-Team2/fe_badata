import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

import Providers from '@/app/_providers';
import FCMLoader from '@/components/FCMLoader';
import { Toaster } from '@/shared/ui/Toaster';

import './globals.css';

export const metadata: Metadata = {
  title: '1인의 바다, 모두의 데이터',
  description: '1인의 바다, 모두의 데이터',
  manifest: '/manifest.json',
  // 성능 최적화를 위한 메타데이터 추가
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'BADATA',
  },
};

export const viewport: Viewport = {
  width: '428',
  userScalable: false,
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* Open Graph 메타 태그(카카오톡 사용) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="1인의 바다, 모두의 데이터" />
        <meta property="og:description" content="남는 데이터를 필요한 사람에게, BADATA" />
        <meta property="og:image" content="https://badata.store/assets/og-image.png" />
        <meta property="og:url" content="https://badata.store" />

        {/* 성능 최적화를 위한 preload */}
        <link rel="preload" href="https://dapi.kakao.com/v2/maps/sdk.js" as="script" />
        <link rel="preload" href="https://cdn.portone.io/v2/browser-sdk.js" as="script" />
        <link rel="preload" href="https://cdn.iamport.kr/v1/iamport.js" as="script" />
        <link
          rel="preload"
          href="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
          as="script"
        />
      </head>
      <body className="antialiased">
        {/* 외부 스크립트 - 성능 최적화 */}
        <Script src="https://cdn.portone.io/v2/browser-sdk.js" strategy="lazyOnload" defer />
        <Script src="https://cdn.iamport.kr/v1/iamport.js" strategy="lazyOnload" defer />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
          integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
          crossOrigin="anonymous"
          strategy="lazyOnload"
          defer
        />
        <Providers>
          <Toaster />
          <FCMLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
