import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfirmProvider } from "@/context/ConfirmContext";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-apple",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WedyPlan — Düğün Planlama & İşletme Yönetim Platformu",
  description:
    "Düğün mekanları, fotoğrafçılar ve organizasyon firmaları ile evlenecek çiftleri buluşturan akıllı platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="bg-[#f5f5f7] text-[#1d1d1f] antialiased selection:bg-[#0071e3]/15 selection:text-[#1d1d1f]">
        <ConfirmProvider>{children}</ConfirmProvider>
      </body>
    </html>
  );
}
