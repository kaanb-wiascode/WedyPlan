export type OpsDesk = 'SUPER' | 'FINANCE' | 'SALES' | 'REGION' | 'CRM';

export const DESKS: { id: OpsDesk; name: string; blurb: string; href: string }[] = [
  { id: 'SUPER', name: 'Süper Admin', blurb: 'Tüm masalar, yetki ve denetim', href: '/admin' },
  { id: 'FINANCE', name: 'Muhasebe ve Finans', blurb: 'Fatura, borç, stok, bordro, GİB', href: '/admin/muhasebe' },
  { id: 'SALES', name: 'Satış ve Pazarlama', blurb: 'CRM, anlaşma, talep, kampanya', href: '/admin/satis' },
  { id: 'REGION', name: 'Bölge Müdürlüğü', blurb: 'Onay, ekip, denetim ve rapor', href: '/admin/bolge' },
  { id: 'CRM', name: 'CRM ve Müşteri Hizmetleri', blurb: 'Çift, anonim ziyaretçi, chatbot', href: '/admin/crm' },
];

export const VENDOR_FEATURES = [
  { key: 'ai_assistant', label: 'AI asistan', path: '/firma/ai-asistan' },
  { key: 'leads', label: 'Teklif talepleri', path: '/firma/talepler' },
  { key: 'calendar', label: 'Takvim ve müsaitlik', path: '/firma/takvim' },
  { key: 'contracts', label: 'Sözleşmeler', path: '/firma/sozlesmeler' },
  { key: 'finance', label: 'Firma finans paneli', path: '/firma/finans' },
  { key: 'showcase', label: 'Vitrin ve galeri', path: '/firma/vitrin' },
  { key: 'reviews', label: 'Yorum yönetimi', path: '/firma/degerlendirmeler' },
  { key: 'team', label: 'Ekip koltukları', path: '/firma/organizasyon' },
  { key: 'featured', label: 'Öne çıkan ilan', path: '/firma/vitrin' },
  { key: 'analytics', label: 'Gelişmiş analitik', path: '/firma/dashboard' },
  { key: 'priority_support', label: 'Öncelikli destek', path: '/firma/talepler' },
  { key: 'whatsapp', label: 'WhatsApp köprüsü', path: '/firma/talepler' },
] as const;

export type VendorFeatureKey = (typeof VENDOR_FEATURES)[number]['key'];

export const DEFAULT_PACKAGES = [
  {
    code: 'VITRIN',
    name: 'Vitrin',
    tagline: 'Katalogda görün, temel talepleri alın',
    monthlyPrice: 1490,
    yearlyPrice: 14900,
    leadQuota: 15,
    featuredSlots: 0,
    teamSeats: 1,
    commissionPct: 14,
    features: ['leads', 'showcase', 'reviews', 'calendar'],
    sortOrder: 1,
  },
  {
    code: 'PRO',
    name: 'Profesyonel',
    tagline: 'CRM, sözleşme ve finans ile satış ofisi',
    monthlyPrice: 3490,
    yearlyPrice: 34900,
    leadQuota: 80,
    featuredSlots: 1,
    teamSeats: 5,
    commissionPct: 11,
    features: ['leads', 'showcase', 'reviews', 'calendar', 'contracts', 'finance', 'team', 'ai_assistant', 'analytics'],
    sortOrder: 2,
  },
  {
    code: 'PRESTIJ',
    name: 'Prestij',
    tagline: 'Öne çıkın, sınırsız talep ve öncelikli destek',
    monthlyPrice: 6990,
    yearlyPrice: 69900,
    leadQuota: 999,
    featuredSlots: 3,
    teamSeats: 20,
    commissionPct: 8,
    features: VENDOR_FEATURES.map((f) => f.key),
    sortOrder: 3,
  },
];

export const COMPANY_TYPES = [
  { id: 'SOLE', name: 'Şahıs Şirketi' },
  { id: 'LIMITED', name: 'Limited Şirketi' },
  { id: 'JOINT_STOCK', name: 'Anonim Şirketi' },
] as const;

export const KYC_DOCS = [
  { id: 'LEGAL_TITLE', label: 'Şirket unvanı', kinds: ['SOLE', 'LIMITED', 'JOINT_STOCK'], file: false },
  { id: 'ADDRESS', label: 'Adres', kinds: ['SOLE', 'LIMITED', 'JOINT_STOCK'], file: false },
  { id: 'PHONE', label: 'Telefon', kinds: ['SOLE', 'LIMITED', 'JOINT_STOCK'], file: false },
  { id: 'EMAIL', label: 'E-posta', kinds: ['SOLE', 'LIMITED', 'JOINT_STOCK'], file: false },
  { id: 'AUTHORIZED_NAME', label: 'Yetkili adı', kinds: ['SOLE', 'LIMITED', 'JOINT_STOCK'], file: false },
  { id: 'ID_FRONT', label: 'Yetkili kimlik belgesi (ön yüz)', kinds: ['SOLE', 'LIMITED', 'JOINT_STOCK'], file: true, accept: '.jpeg,.jpg,.png,.pdf' },
  { id: 'ID_BACK', label: 'Yetkili kimlik belgesi (arka yüz)', kinds: ['SOLE', 'LIMITED', 'JOINT_STOCK'], file: true, accept: '.jpeg,.jpg,.png,.pdf' },
  { id: 'TAX_PLATE', label: 'Vergi levhası', kinds: ['SOLE', 'LIMITED', 'JOINT_STOCK'], file: true, accept: '.pdf' },
  { id: 'SIGNATURE_CIRCULAR', label: 'İmza sirküleri', kinds: ['SOLE', 'LIMITED', 'JOINT_STOCK'], file: true, accept: '.pdf' },
  { id: 'TRADE_REGISTRY', label: 'Ticaret Sicil Gazetesi örneği', kinds: ['LIMITED', 'JOINT_STOCK'], file: true, accept: '.pdf' },
  { id: 'CHAMBER_CERT', label: 'Ticaret Odası veya Borsası kayıt belgesi', kinds: ['LIMITED', 'JOINT_STOCK'], file: true, accept: '.pdf' },
  { id: 'POWER_OF_ATTORNEY', label: 'Vekaletname', kinds: ['LIMITED', 'JOINT_STOCK'], file: true, accept: '.pdf' },
] as const;

export const DEAL_STAGES = [
  { id: 'LEAD', label: 'Aday' },
  { id: 'QUALIFIED', label: 'Nitelikli' },
  { id: 'PROPOSAL', label: 'Teklif' },
  { id: 'NEGOTIATION', label: 'Müzakere' },
  { id: 'PENDING_APPROVAL', label: 'Bölge onayı' },
  { id: 'WON', label: 'Kazanıldı' },
  { id: 'LOST', label: 'Kaybedildi' },
] as const;

export const DEFAULT_CHANNELS = [
  { name: 'Genel', desk: null as OpsDesk | null },
  { name: 'Muhasebe', desk: 'FINANCE' as OpsDesk },
  { name: 'Satış odası', desk: 'SALES' as OpsDesk },
  { name: 'Bölge', desk: 'REGION' as OpsDesk },
  { name: 'Müşteri hizmetleri', desk: 'CRM' as OpsDesk },
  { name: 'WedyPulse', desk: null as OpsDesk | null },
];

export const INTEGRATIONS = [
  { key: 'GIB_API', label: 'GİB e-Fatura / e-Arşiv' },
  { key: 'PARASUT_API', label: 'Paraşüt ön muhasebe' },
  { key: 'GOOGLE_CALENDAR', label: 'Google Takvim' },
  { key: 'GOOGLE_MEET', label: 'Google Meet' },
  { key: 'APPLE_CALENDAR', label: 'Apple Takvim (ICS)' },
  { key: 'GOOGLE_CHAT', label: 'Google Chat' },
  { key: 'TEAMS', label: 'Microsoft Teams' },
];

export const DESK_NAV: Record<OpsDesk, { title: string; items: { href: string; name: string; icon: string }[] }[]> = {
  SUPER: [],
  FINANCE: [
    {
      title: 'Muhasebe',
      items: [
        { href: '/admin/muhasebe', name: 'Finans kokpiti', icon: 'Wallet' },
        { href: '/admin/muhasebe/faturalar', name: 'Faturalar / GİB', icon: 'Receipt' },
        { href: '/admin/muhasebe/borclar', name: 'Borç ve vadeler', icon: 'Scale' },
        { href: '/admin/muhasebe/stok', name: 'Stok ve envanter', icon: 'Boxes' },
        { href: '/admin/muhasebe/bordro', name: 'İK ve bordro', icon: 'BadgeDollarSign' },
      ],
    },
  ],
  SALES: [
    {
      title: 'Satış',
      items: [
        { href: '/admin/satis', name: 'Satış kokpiti', icon: 'Target' },
        { href: '/admin/satis/musteriler', name: 'Müşteriler', icon: 'Contact' },
        { href: '/admin/satis/anlasmalar', name: 'Anlaşmalar', icon: 'Handshake' },
        { href: '/admin/satis/talepler', name: 'Firma talepleri', icon: 'Inbox' },
      ],
    },
  ],
  REGION: [
    {
      title: 'Bölge',
      items: [
        { href: '/admin/bolge', name: 'Bölge kokpiti', icon: 'MapPinned' },
        { href: '/admin/bolge/ekipler', name: 'Satış ekipleri', icon: 'Users' },
        { href: '/admin/muhasebe', name: 'Finans görünümü', icon: 'Wallet' },
        { href: '/admin/satis/anlasmalar', name: 'Anlaşma onayları', icon: 'Handshake' },
      ],
    },
  ],
  CRM: [
    {
      title: 'Müşteri',
      items: [
        { href: '/admin/crm', name: 'Hizmet kokpiti', icon: 'Headphones' },
        { href: '/admin/crm/talepler', name: 'Destek kuyruğu', icon: 'Ticket' },
        { href: '/admin/crm/sohbet', name: 'Sohbet / chatbot', icon: 'MessageCircle' },
        { href: '/admin/mesaj-denetim', name: 'Firma mesajları', icon: 'MessagesSquare' },
      ],
    },
  ],
};

export const SHARED_NAV = [
  { href: '/admin/gorevler', name: 'Görevler', icon: 'ListTodo' },
  { href: '/admin/mesajlar', name: 'Ekip sohbeti', icon: 'MessagesSquare' },
  { href: '/admin/takvim', name: 'Takvim ve toplantı', icon: 'Calendar' },
  { href: '/admin/raporlar', name: 'Raporlar', icon: 'FileBarChart' },
];

export const SUPER_NAV = [
  {
    title: 'Platform',
    items: [
      { href: '/admin', name: 'Komuta merkezi', icon: 'LayoutDashboard', exact: true },
      { href: '/admin/paketler', name: 'Firma paketleri', icon: 'Gem' },
      { href: '/admin/evrak', name: 'Evrak / KYC', icon: 'FolderCheck' },
      { href: '/admin/ekip', name: 'Ekip ve yetki', icon: 'Shield' },
    ],
  },
  {
    title: 'Operasyon',
    items: [
        { href: '/admin/onaylar', name: 'Firma onayları', icon: 'ClipboardCheck' },
        { href: '/admin/firmalar', name: 'Firmalar', icon: 'Store' },
      { href: '/admin/ciftler', name: 'Çiftler', icon: 'Users' },
      { href: '/admin/hizmetler', name: 'Hizmet denetimi', icon: 'ListChecks' },
      { href: '/admin/talepler', name: 'Katalog talepleri', icon: 'Inbox' },
    ],
  },
];

export function docsForCompany(type: string) {
  return KYC_DOCS.filter((doc) => (doc.kinds as readonly string[]).includes(type));
}

export function deskHome(desk: OpsDesk) {
  return DESKS.find((item) => item.id === desk)?.href || '/admin';
}
