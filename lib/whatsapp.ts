export function generateWhatsAppLink(phone: string, vendorName: string, clientName: string, date: string, message?: string) {
    const cleanPhone = phone.replace(/\D/g, '');
    const formattedText = `Merhaba ${vendorName},\n\nWedyPlan üzerinden ulaşıyorum.\n👤 *İsim:* ${clientName}\n📅 *Düğün Tarihi:* ${date}\n💬 *Not:* ${message || 'Fiyat teklifi ve detaylar hakkında bilgi almak istiyorum.'}`;
    
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedText)}`;
  }