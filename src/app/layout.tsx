import { ReactNode } from 'react';
import RootLayoutClient from './RootLayoutClient';
import Script from 'next/script';

import './globals.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
        <head>
        {/* Carrega o JS do gov.br de forma segura, só no client */}
        <Script
          src="/govbr-core.min.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
