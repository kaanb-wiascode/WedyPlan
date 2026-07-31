// lib/navigation.ts

export interface NavItem {
    title: string;
    href: string;
    icon?: string;
  }
  
  // Çift Portalı Menüsü
  export const COUPLE_NAV_ITEMS: NavItem[] = [
    { title: 'Özet Panel', href: '/cift/dashboard' },
    { title: 'Bütçe Yönetimi', href: '/cift/butce' },
    { title: 'Davetli Listesi & LCV', href: '/cift/davetliler' },
    { title: 'Kontrol Listesi', href: '/cift/gorevler' },
    { title: 'AI Asistan', href: '/cift/ai-asistan' },
    { title: 'Dijital Davetiye', href: '/cift/dijital-davetiye' },
    { title: 'Anlaşmalı Firmalarım', href: '/cift/firmalarim' },
  ];
  
  // Satıcı / Firma Portalı Menüsü
  export const VENDOR_NAV_ITEMS: NavItem[] = [
    { title: 'Yönetim Paneli', href: '/satici' },
    { title: 'Gelen Talepler', href: '/satici/talepler' },
    { title: 'Teklif Hazırla', href: '/satici/teklif-hazirla' },
    { title: 'Takvim & Randevu', href: '/firma/takvim' },
    { title: 'Finans & Hakediş', href: '/satici/finans' },
    { title: 'Vitrin Düzenle', href: '/firma/vitrin' },
  ];
  
  // Admin Portalı Menüsü
  export const ADMIN_NAV_ITEMS: NavItem[] = [
    { title: 'Genel Bakış', href: '/admin' },
    { title: 'Kullanıcılar / Çiftler', href: '/admin/couples' },
    { title: 'Firmalar / Satıcılar', href: '/admin/vendors' },
    { title: 'Sistem Yapılandırması', href: '/admin/system-config' },
  ];