export interface UserAIContext {
  role: 'cift' | 'firma';
  name: string;
  weddingDate?: string;
  budget?: string;
  guestCount?: string;
  venue?: string;
  category?: string;
  activeQuotes?: string;
}

/**
 * Oturum açmış kullanıcının veritabanı verilerini WedyAI için hazırlar.
 * Veritabanı entegrasyonu tamamlandığında Supabase / Prisma buraya bağlanır.
 */
export async function getAIContextForUser(userId?: string, role: 'cift' | 'firma' = 'cift'): Promise<UserAIContext> {
  if (role === 'firma') {
    return {
      role: 'firma',
      name: 'Beykoz Kır Bahçesi & Event',
      category: 'Düğün Mekanı / Kır Bahçesi',
      activeQuotes: '14 Açık Teklif',
    };
  }

  return {
    role: 'cift',
    name: 'Selin & Kaan',
    weddingDate: '15 Eylül 2026',
    budget: '450.000',
    guestCount: '250',
    venue: 'Kır Düğünü / Beykoz',
  };
}