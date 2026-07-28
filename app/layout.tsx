import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar"; // 👈 Navbar içe aktarıldı

// Modern, kurumsal ve okunabilirliği yüksek gövde fontu
const sansFont = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"]
});

// Logo ile birebir uyumlu, lüks editorial serif başlık fontu
const serifFont = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"]
});

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "WedyPlan — Wedding Studio & Intelligent WOS",
    template: "%s | WedyPlan",
  },
  description: "Yapay Zeka Destekli Lüks Düğün Planlama ve İşletim Sistemi. Düğün salonları, organizasyon, bütçe yönetimi ve WedyAI desteği.",
  openGraph: {
    title: "WedyPlan — Wedding Studio & Intelligent WOS",
    description: "Hayalinizdeki düğünü yapay zeka ile planlayın, kaporadan gün takibine kadar her şeyi tek yerden yönetin.",
    url: "https://wedyplan.com",
    siteName: "WedyPlan",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WedyPlan — Wedding Studio & Intelligent WOS",
    description: "Yapay Zeka Destekli Düğün Planlama ve İşletim Sistemi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${sansFont.variable} ${serifFont.variable}`}>
      <body className="font-sans antialiased bg-[#F5F4F0] text-[#111111] selection:bg-[#111111] selection:text-[#F5F4F0]">
        <AuthProvider>
          <Navbar /> {/* 👈 Logomuzu ve menümüzü ekrana basan ana bileşen */}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}