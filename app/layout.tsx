import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: "WedyPlan - Düğün Mekanları & Düğün Planlama Asistanı",
    template: "%s | WedyPlan",
  },
  description:
    "Hayalinizdeki düğün mekanlarını, fotoğrafçıları ve organizasyon firmalarını keşfedin. Ücretsiz bütçe hesaplayıcı ve düğün geri sayım sayacı ile düğününüzü kolayca planlayın.",
  keywords: [
    "düğün mekanları",
    "kır bahçesi",
    "düğün salonu",
    "düğün fotoğrafçısı",
    "düğün bütçe hesaplayıcı",
    "düğün geri sayımı",
    "düğün organizasyon",
  ],
  authors: [{ name: "WedyPlan Team" }],
  openGraph: {
    title: "WedyPlan - Akıllı Düğün Pazaryeri & Planlama Asistanı",
    description:
      "Aradığınız tüm düğün profesyonelleri burada! Ücretsiz fiyat teklifi alın, bütçenizi ve hazırlık adımlarınızı yönetin.",
    url: "[https://wedy-plan.vercel.app](https://wedy-plan.vercel.app)",
    siteName: "WedyPlan",
    images: [
      {
        url: "[https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200](https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200)",
        width: 1200,
        height: 630,
        alt: "WedyPlan Düğün Pazaryeri",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WedyPlan - Düğün Mekanları & Planlama Asistanı",
    description: "Düğün hazırlıklarınızı kolaylaştıracak tüm araçlar ve firmalar WedyPlan'da.",
    images: ["[https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200](https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200)"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}