import { 
    TimelinePhase, 
    BudgetItemOS, 
    GuestOS, 
    WeddingDayTimelineStep, 
    AiPlannerInsight, 
    CoupleTaskOS,
    WeddingWebsiteConfig 
  } from '@/types/couple-command';
  
  export const WEDDING_TIMELINE_PHASES: TimelinePhase[] = [
    { id: 'p1', title: 'Nişan & İstemeler', dateRange: 'Ocak 2026', status: 'COMPLETED', description: 'Aile arası nişan töreni tamamlandı.' },
    { id: 'p2', title: 'Mekan & Ana Tedarikçiler', dateRange: 'Şubat - Mart 2026', status: 'COMPLETED', description: 'Luxe Kır Bahçesi ve Fotoğrafçı bağlandı.' },
    { id: 'p3', title: 'Davetiyeler & LCV Takibi', dateRange: 'Mayıs - Haziran 2026', status: 'IN_PROGRESS', description: 'QR LCV davetiyeleri gönderildi, yanıtlar toplanıyor.' },
    { id: 'p4', title: 'Düğün Günü Operasyonu', dateRange: '15 Ağustos 2026', status: 'UPCOMING', description: 'Dakika dakika düğün akış planı devreye girecek.' },
    { id: 'p5', title: 'Balayı & Anılar', dateRange: 'Eylül 2026', status: 'UPCOMING', description: 'Maldivler konaklaması ve albüm teslim süreci.' }
  ];
  
  export const BUDGET_OS_ITEMS: BudgetItemOS[] = [
    { id: 'b1', category: 'Mekan & Catering', title: 'Kır Bahçesi Kiralama & Menü', vendorName: 'Luxe Kır Bahçesi', estimatedPrice: 250000, actualPrice: 250000, paidAmount: 150000, dueDate: '2026-08-01', isPaid: false, status: 'SAFE' },
    { id: 'b2', category: 'Fotoğraf & Video', title: '4K Düğün Hikayesi & Drone', vendorName: 'Studio Focus', estimatedPrice: 50000, actualPrice: 60000, paidAmount: 60000, dueDate: '2026-06-15', isPaid: true, status: 'RISK_OVERRUN' },
    { id: 'b3', category: 'Gelinlik & Damatlık', title: 'Haute Couture Düğün Kostümleri', vendorName: 'Modaevi', estimatedPrice: 90000, actualPrice: 80000, paidAmount: 80000, dueDate: '2026-07-10', isPaid: true, status: 'SAVED' },
    { id: 'b4', category: 'Müzik & Işık', title: 'Canlı Orkestra & DJ Seti', vendorName: 'Akustik Ekip', estimatedPrice: 40000, actualPrice: 40000, paidAmount: 10000, dueDate: '2026-08-10', isPaid: false, status: 'SAFE' }
  ];
  
  export const GUESTS_OS_LIST: GuestOS[] = [
    { id: 'g1', fullName: 'Ahmet & Ayşe Yılmaz', group: 'Gelin Ailesi', rsvpStatus: 'CONFIRMED', tableNumber: 'Masa 1 (Protokol)', dietaryNotes: 'Vejetaryen', plusOne: true, plusOneName: 'Zeynep Yılmaz', needsTransfer: false, needsAccommodation: false, qrCode: 'WEDY-G1-99' },
    { id: 'g2', fullName: 'Mehmet Kaya', group: 'Damat Ailesi', rsvpStatus: 'CONFIRMED', tableNumber: 'Masa 2', plusOne: true, needsTransfer: true, needsAccommodation: true, qrCode: 'WEDY-G2-10' },
    { id: 'g3', fullName: 'Caner & Ece Öztürk', group: 'Ortak Arkadaş', rsvpStatus: 'WAITING', tableNumber: 'Masa 4 (Üniversite)', plusOne: false, needsTransfer: false, needsAccommodation: false, qrCode: 'WEDY-G3-44' }
  ];
  
  export const WEDDING_DAY_STEPS: WeddingDayTimelineStep[] = [
    { id: 's1', time: '08:30', title: 'Gelinlik Hazırlık & Kuaför', responsiblePerson: 'Merve (Makyöz)', location: 'Gelin Hazırlık Süiti', status: 'COMPLETED', note: 'Gelin buketi teslim alındı.' },
    { id: 's2', time: '11:00', title: 'Damatlık & İlk Karşılaşma (First Look)', responsiblePerson: 'Studio Focus Çekim Ekibi', location: 'Botanik Bahçe', status: 'ACTIVE', note: 'Drone çekimi için hava durumu rüzgarsız.' },
    { id: 's3', time: '17:00', title: 'Resmi Nikah Töreni', responsiblePerson: 'Nikah Memuru & Şahitler', location: 'Açık Hava Kürsüsü', status: 'PENDING' },
    { id: 's4', time: '20:00', title: 'Pasta Kesimi & İlk Dans', responsiblePerson: 'Orkestra Şefi', location: 'Ana Balo Pist', status: 'PENDING' },
    { id: 's5', time: '22:30', title: 'After Party Başlangıcı', responsiblePerson: 'DJ Arda', location: 'Cam Balo Salonu', status: 'PENDING' }
  ];
  
  export const AI_PLANNER_INSIGHTS: AiPlannerInsight[] = [
    { id: 'i1', type: 'WEATHER', title: '15 Ağustos Hava Durumu Tahmini', description: 'Düğün günü Beykoz bölgesinde hava 28°C ve nem %45. Açık hava kır düğünü için rüzgarsız kusursuz bir akşam.', actionText: 'Detaylı Saatlik Rapor' },
    { id: 'i2', type: 'SAVING', title: 'Bütçe Tasarruf Fırsatı', description: 'Orkestra ödemesinde nakit kapora kapatıldığında ek %5 indirim avantajı tanımlandı.', actionText: '₺2,000 Tasarruf Et', impactValue: '₺2,000' },
    { id: 'i3', type: 'RISK', title: 'Masa Oturma Düzeni Uyarısı', description: 'Masa 4 için henüz katılım teyidi vermeyen 3 davetli var. Oturma planını finalize etmek için LCV hatırlatıcısı gönderin.', actionText: 'Tek Tıkla SMS Gönder' }
  ];
  
  export const COUPLE_SHARED_TASKS: CoupleTaskOS[] = [
    { id: 't1', title: 'İlk dans şarkısının belirlenmesi', assignedTo: 'Selin', dueDate: '2026-08-01', isCompleted: true },
    { id: 't2', title: 'Damatlık ayakkabısı ve aksesuarlarının alınması', assignedTo: 'Kaan', dueDate: '2026-08-05', isCompleted: false },
    { id: 't3', title: 'Otobüs ve transfer güzergahlarının onaylanması', assignedTo: 'Ortak', dueDate: '2026-08-08', isCompleted: false }
  ];
  
  export const DEFAULT_WEBSITE_CONFIG: WeddingWebsiteConfig = {
    slug: 'selinvekaan',
    title: 'Selin & Kaan Evleniyor!',
    storyText: 'Üniversite yıllarında başlayan hikayemizi, 15 Ağustos 2026 Cumartesi gecesi siz sevdiklerimizle taçlandırıyoruz.',
    weddingDate: '2026-08-15',
    venueName: 'Luxe Kır Bahçesi & Balo Salonu',
    address: 'Polonezköy Yolu No: 42, Beykoz / İstanbul',
    giftRegistryUrl: 'https://selinvekaan.wedyplan.com/hediye-listesi',
    isPublished: true
  };