import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "WedyPlan — Akıllı Düğün Pazaryeri & WOS",
  description: "Yapay Zeka Destekli Düğün Planlama ve İşletim Sistemi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-[#FDFBFD]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}