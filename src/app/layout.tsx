import type { Metadata } from 'next';
import './globals.css';
import Providers from '@app/_providers';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  viewport: 'width=428, user-scalable=no',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
