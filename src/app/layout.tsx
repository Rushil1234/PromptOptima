import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LLM Optimizer - Dual-Strategy Prompt Compression",
  description: "Intelligent middleware for LLM optimization using LLMLingua compression and SynthLang symbolic systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ background: '#0a0a0a' }}>
      <body style={{ background: '#0a0a0a' }}>{children}</body>
    </html>
  );
}
