import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LLM Optimizer - Dual-Strategy Prompt Compression",
  description: "Intelligent middleware for LLM optimization using LLMLingua compression and SynthLang symbolic systems",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: '#0a0a0a', height: '100%' }}>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body {
              background: #0a0a0a !important;
              background-color: #0a0a0a !important;
              overscroll-behavior: none;
              height: 100%;
              width: 100%;
              position: fixed;
              overflow-y: scroll;
            }
            #__next {
              height: 100%;
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
            }
          `
        }} />
      </head>
      <body style={{ backgroundColor: '#0a0a0a', height: '100%', margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
