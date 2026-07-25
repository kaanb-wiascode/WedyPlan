import React from 'react';
import WedyAiWidget from '@/components/WedyAiWidget';
import './globals.css'; // Varsa mevcut CSS importun

export const metadata = {
  title: 'WedyPlan - Düğün Planlama Platformu',
  description: 'VIP Düğün ve Organizasyon Asistanı',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        {children}
        {/* Yüzen Akıllı Asistan Widget'ı */}
        <WedyAiWidget />
      </body>
    </html>
  );
}