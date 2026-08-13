import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-pg', 'pg'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/login", destination: "/giris", permanent: true },
      { source: "/firsatlar", destination: "/kampanyalar", permanent: true },
      { source: "/cift", destination: "/cift/dashboard", permanent: true },
      { source: "/cift/settings", destination: "/cift/ayarlar", permanent: true },
      { source: "/cift/firmalarim", destination: "/cift/firmalar", permanent: true },
      { source: "/firma", destination: "/firma/dashboard", permanent: true },
      { source: "/vitrin", destination: "/firma/vitrin", permanent: true },

      { source: "/dashboard", destination: "/cift/dashboard", permanent: true },
      { source: "/budget", destination: "/cift/butce", permanent: true },
      { source: "/guests", destination: "/cift/davetliler", permanent: true },
      { source: "/checklist", destination: "/cift/gorevler", permanent: true },
      { source: "/timeline", destination: "/cift/gorevler", permanent: true },
      { source: "/ai-planner", destination: "/cift/ai-asistan", permanent: true },
      { source: "/settings", destination: "/cift/ayarlar", permanent: true },
      { source: "/onboarding", destination: "/cift/onboarding", permanent: true },
      { source: "/payments", destination: "/cift/odeme", permanent: true },
      { source: "/invitations", destination: "/cift/dijital-davetiye", permanent: true },
      { source: "/messages", destination: "/cift/messages", permanent: true },
      { source: "/vendors", destination: "/cift/firmalar", permanent: true },
      { source: "/profile", destination: "/cift/ayarlar", permanent: true },
      { source: "/requests", destination: "/cift/firmalar", permanent: true },
      { source: "/proposals", destination: "/cift/messages", permanent: true },
      { source: "/contracts", destination: "/cift/odeme", permanent: true },
      { source: "/website", destination: "/cift/dijital-davetiye", permanent: true },
      { source: "/vault", destination: "/cift/fotograf-duvari", permanent: true },
      { source: "/insights", destination: "/cift/dashboard", permanent: true },

      { source: "/vendor", destination: "/firma/dashboard", permanent: true },
      { source: "/vendor/dashboard", destination: "/firma/dashboard", permanent: true },
      { source: "/vendor/executive", destination: "/firma/dashboard", permanent: true },
      { source: "/vendor/crm", destination: "/firma/talepler", permanent: true },
      { source: "/vendor/leads", destination: "/firma/talepler", permanent: true },
      { source: "/vendor/calendar", destination: "/firma/takvim", permanent: true },
      { source: "/vendor/contracts", destination: "/firma/sozlesmeler", permanent: true },
      { source: "/vendor/proposals", destination: "/firma/sozlesmeler", permanent: true },
      { source: "/vendor/finance", destination: "/firma/finans", permanent: true },
      { source: "/vendor/media", destination: "/firma/vitrin", permanent: true },
      { source: "/vendor/reviews", destination: "/firma/degerlendirmeler", permanent: true },
      { source: "/vendor/team", destination: "/firma/organizasyon", permanent: true },
      { source: "/vendor/settings", destination: "/firma/ayarlar", permanent: true },
      { source: "/vendor/profile", destination: "/firma/ayarlar", permanent: true },
      { source: "/vendor/security", destination: "/firma/ayarlar", permanent: true },
      { source: "/vendor/assistant", destination: "/firma/ai-asistan", permanent: true },
      { source: "/vendor/packages", destination: "/satici/paketler", permanent: true },
      { source: "/vendor/:path+", destination: "/firma/dashboard", permanent: true },

      { source: "/gelinlik-modelleri", destination: "/gelinlik", permanent: true },
      { source: "/mekanlar/dugun-salonlari", destination: "/dugun-salonlari", permanent: true },
      { source: "/mekanlar/kir-bahceleri", destination: "/kir-dugunu", permanent: true },
      { source: "/mekanlar/oteller", destination: "/oteller", permanent: true },
      { source: "/mekanlar/tarihi-mekanlar", destination: "/tarihi-mekanlar", permanent: true },
      { source: "/firmalar/fotografcilar", destination: "/dugun-fotografcilari", permanent: true },
      { source: "/firmalar/organizasyon", destination: "/dugun-organizasyon", permanent: true },
      { source: "/firmalar/muzik", destination: "/muzik", permanent: true },
      { source: "/firmalar/kuator", destination: "/gelin-saci-ve-makyaji", permanent: true },
      { source: "/kategori/dugun-mekanlari", destination: "/dugun-mekanlari", permanent: true },
    ];
  },
};

export default nextConfig;
