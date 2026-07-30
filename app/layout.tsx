import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-apple",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WedyPlan — Düğün Planlama & İşletme Yönetim Platformu",
  description: "Düğün mekanları, fotoğrafçılar ve organizasyon firmaları ile evlenecek çiftleri buluşturan akıllı platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="bg-[#FDFBF7] text-neutral-900 font-sans antialiased selection:bg-rose-100 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}