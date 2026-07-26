'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CreditCard, ShieldCheck, FileText, CheckCircle2, Lock, 
  Building2, Sparkles, ArrowRight, Download, AlertCircle, Coins
} from 'lucide-react';

export default function PaymentAndContractsPage() {
  const [activeTab, setActiveTab] = useState<'contracts' | 'pay'>('pay');
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  // Kart Form State'leri
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [installment, setInstallment] = useState('1');

  const contractDetails = {
    id: 'WED-2026-884',
    vendorName: 'Beykoz Secret Garden & Event',
    service: '2026 Yaz Kır Düğünü Paketi (300 Kişi)',
    totalAmount: 145000,
    paidAmount: 45000,
    remainingAmount: 100000,
    nextPaymentDate: '15 Mayıs 2026',
    status: 'Sözleşme İmzalandı • Kapora Ödendi'
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaidSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans selection:bg-[#111111] selection:text-white pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-black/[0.06]">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#111111]">
            WedyPlan<span className="text-[#D4AF37]">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#555]">
            <Link href="/cift/butce" className="hover:text-[#111] transition-colors">Bütçe</Link>
            <Link href="/cift/fotograf-duvari" className="hover:text-[#111] transition-colors">Fotoğraf Duvarı</Link>
            <Link href="/cift/odeme" className="text-[#111] font-bold">Ödemeler & Sözleşme</Link>
            <Link href="/cift/ai-asistan" className="flex items-center gap-1.5 text-[#111] font-bold">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> WedyAI
            </Link>
          </div>

          <div className="flex items-center gap-2 text-[12px] text-emerald-700 font-medium bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Korumalı Güvenli Ödeme</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1240px] mx-auto px-6 pt-8 space-y-8">
        
        {/* Özet Kartı */}
        <div className="bg-[#111111] text-white p-8 rounded-[32px] shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[11px] text-[#D4AF37] font-mono tracking-widest uppercase">
              <FileText className="w-3.5 h-3.5" /> Dijital Sözleşme No: {contractDetails.id}
            </div>
            <h1 className="text-[28px] md:text-[34px] font-serif font-normal">
              {contractDetails.vendorName}
            </h1>
            <p className="text-[13px] text-white/70 font-light">
              {contractDetails.service}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-[24px] border border-white/10 text-right shrink-0">
            <span className="text-[11px] font-mono uppercase text-white/60 block">Kalan Ödeme Tutarı</span>
            <span className="text-[28px] font-bold font-mono text-[#D4AF37]">
              {contractDetails.remainingAmount.toLocaleString('tr-TR')} ₺
            </span>
          </div>
        </div>

        {/* Ödeme Formu ve Sözleşme Detayı */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sol: Sözleşme & Taksit Planı (5 Kolon) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-black/10 rounded-[32px] p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <h3 className="font-serif text-[18px] font-medium text-[#111]">Sözleşme Özeti</h3>
                <button className="text-[12px] text-[#D4AF37] font-semibold flex items-center gap-1 hover:underline">
                  <Download className="w-3.5 h-3.5" /> PDF İndir
                </button>
              </div>

              <div className="space-y-3 text-[13px]">
                <div className="flex justify-between py-1 border-b border-black/5">
                  <span className="text-[#777]">Toplam Sözleşme Değeri:</span>
                  <span className="font-bold text-[#111]">{contractDetails.totalAmount.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/5">
                  <span className="text-[#777]">Ödenen Kapora:</span>
                  <span className="font-bold text-emerald-600">-{contractDetails.paidAmount.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/5">
                  <span className="text-[#777]">Sonraki Taksit Tarihi:</span>
                  <span className="font-semibold text-[#111]">{contractDetails.nextPaymentDate}</span>
                </div>
              </div>

              <div className="p-4 bg-[#FBFBF9] border border-black/5 rounded-2xl flex items-start gap-3 text-[11px] text-[#555]">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>WedyPlan Alıcı Koruması:</strong> Ödemeniz mekan veya tedarikçi hizmeti tamamlayana kadar güvence altında tutulur.
                </p>
              </div>
            </div>

          </div>

          {/* Sağ: Sanal POS Ödeme Ekranı (7 Kolon) */}
          <div className="lg:col-span-7 bg-white border border-black/10 rounded-[32px] p-8 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <div>
                <h3 className="font-serif text-[22px] font-medium text-[#111]">Kredi Kartı ile Ödeme Yap</h3>
                <p className="text-[12px] text-[#666]">Tüm banka kartlarına 12 aya varan taksit imkanı.</p>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-[#111]" />
              </div>
            </div>

            {isPaidSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-[22px] text-[#111]">Ödemeniz Başarıyla Alındı!</h4>
                <p className="text-[13px] text-[#666]">Makbuzunuz ve güncel sözleşmeniz e-posta adresinize gönderildi.</p>
                <Link href="/cift/butce" className="inline-block pt-2">
                  <button className="px-6 py-2.5 bg-[#111111] text-white rounded-full text-[13px] font-medium">
                    Bütçemi İncele
                  </button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handlePay} className="space-y-4 text-[13px]">
                
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Kart Üzerindeki İsim</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Selin Akray"
                    value={cardHolder} 
                    onChange={e => setCardHolder(e.target.value)}
                    className="w-full h-11 px-4 bg-[#FBFBF9] border border-black/10 rounded-xl outline-none focus:border-black/30 font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Kart Numarası</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber} 
                    onChange={e => setCardNumber(e.target.value)}
                    className="w-full h-11 px-4 bg-[#FBFBF9] border border-black/10 rounded-xl outline-none font-mono text-[14px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Son Kullanma Tarihi</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="MM/YY"
                      value={expiry} 
                      onChange={e => setExpiry(e.target.value)}
                      className="w-full h-11 px-4 bg-[#FBFBF9] border border-black/10 rounded-xl outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">CVC / CVV</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="123"
                      value={cvc} 
                      onChange={e => setCvc(e.target.value)}
                      className="w-full h-11 px-4 bg-[#FBFBF9] border border-black/10 rounded-xl outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Taksit Seçeneği</label>
                  <select 
                    value={installment} 
                    onChange={e => setInstallment(e.target.value)}
                    className="w-full h-11 px-3.5 bg-[#FBFBF9] border border-black/10 rounded-xl outline-none font-medium"
                  >
                    <option value="1">Tek Çekim (Komisyonsuz)</option>
                    <option value="3">3 Taksit (Aylık ~33.333 ₺)</option>
                    <option value="6">6 Taksit (Aylık ~16.666 ₺)</option>
                    <option value="12">12 Taksit (Aylık ~8.333 ₺)</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="w-full h-13 bg-[#111111] hover:bg-[#333] text-white font-medium rounded-full text-[14px] transition-all shadow-md mt-4 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Güvenli Ödemeyi Tamamla ({contractDetails.remainingAmount.toLocaleString('tr-TR')} ₺)</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}