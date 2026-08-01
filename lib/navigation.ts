export interface NavItem {
  title: string;
  href: string;
  icon?: string;
}

export const COUPLE_NAV_ITEMS: NavItem[] = [
  {
    title: 'Özet & Dashboard',
    href: '/cift/dashboard',
  },
  {
    title: 'Bütçe Planlayıcı',
    href: '/cift/butce',
  },
  {
    title: 'Görevler & Adımlar',
    href: '/cift/gorevler',
  },
  {
    title: 'Davetliler & LCV',
    href: '/cift/davetliler',
  },
  {
    title: 'Anlaşmalı Firmalar',
    href: '/cift/firmalar',
  },
  {
    title: 'Dijital Davetiye',
    href: '/cift/dijital-davetiye',
  },
  {
    title: 'Mesajlar & Teklifler',
    href: '/cift/mesajlar',
  },
  {
    title: 'Ödeme Planı',
    href: '/cift/odeme',
  },
  {
    title: 'WedyAI Asistan',
    href: '/cift/ai-asistan',
  },
];