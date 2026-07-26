import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const viewport: Viewport = {
  themeColor: '#E6007E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "WedyPlan — Akıllı Düğün Pazaryeri & WOS",
    template: "%s | WedyPlan",
  },
  description: "Yapay Zeka Destekli Düğün Planlama ve İşletim Sistemi. Düğün salonları, kır bahçeleri, bütçe yönetimi ve WedyAI desteği.",
  openGraph: {
    title: "WedyPlan — Akıllı Düğün Pazaryeri & WOS",
    description: "Hayalinizdeki düğünü yapay zeka ile planlayın, kaporadan gün takibine kadar her şeyi tek yerden yönetin.",
    url: "https://wedyplan.com",
    siteName: "WedyPlan",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WedyPlan — Akıllı Düğün Pazaryeri & WOS",
    description: "Yapay Zeka Destekli Düğün Planlama ve İşletim Sistemi",
  },
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