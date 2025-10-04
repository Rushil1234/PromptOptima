import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LLM Optimizer - Dual-Strategy Prompt Compression",
  description: "Intelligent middleware for LLM optimization using LLMLingua compression and SynthLang symbolic systems",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ background: '#000000', backgroundColor: '#000000' }}>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body style={{ background: '#000000', backgroundColor: '#000000' }}>{children}</body>
    </html>
  );
}
