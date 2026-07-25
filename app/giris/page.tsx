'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWeddingOS, UserRole } from '@/store/useWeddingOS';
import { 
  Heart, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Mail, 
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

export default function PremiumAuthPage() {
  const router = useRouter();
  const { setUserRole } = useWeddingOS();

  // Selected Portal Persona
  const [selectedRole, setSelectedRole] = useState<'COUPLE' | 'VENDOR'>('COUPLE');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set system role
    setUserRole(selectedRole);

    // Route strictly based on persona
    if (selectedRole === 'COUPLE') {
      router.push('/cift/dashboard');
    } else {
      router.push('/satici');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F7] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white flex flex-col justify-between p-6 md:p-12">
      
      {/* Top Header */}
      <header className="max-w-[1200px] mx-auto w-full flex justify-between items-center z-10">
        <Link href="/" className="text-[22px] font-medium tracking-tight">WedyPlan.</Link>
        <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#666666] hover:text-[#111111] transition-colors">
          <ChevronLeft className="w-4 h-4" /> Ana Sayfaya Dön
        </Link>
      </header>

      {/* Main Form Canvas */}
      <main className="max-w-[480px] mx-auto w-full my-auto py-10 animate-in fade-in duration-500">
        
        <div className="bg-white rounded-[32px] border border-[rgba(0,0,0,0.06)] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-[32px] font-medium tracking-tight text-[#111111]">
              Giriş Yapın
            </h1>
            <p className="text-[14px] text-[#666666]">
              WedyPlan İşletim Sistemine erişmek için alanınızı seçin.
            </p>
          </div>

          {/* Persona Selector (Segmented Switcher) */}
          <div className="p-1.5 bg-[#F8F8F7] rounded-[20px] grid grid-cols-2 gap-1 border border-[rgba(0,0,0,0.04)]">
            <button
              type="button"
              onClick={() => setSelectedRole('COUPLE')}
              className={`h-[48px] rounded-[16px] text-[13px] font-medium flex items-center justify-center gap-2 transition-all ${
                selectedRole === 'COUPLE'
                  ? 'bg-white text-[#111111] shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
                  : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              <Heart className={`w-4 h-4 ${selectedRole === 'COUPLE' ? 'fill-[#7C5CFF] text-[#7C5CFF]' : ''}`} />
              <span>Çift Portalı</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('VENDOR')}
              className={`h-[48px] rounded-[16px] text-[13px] font-medium flex items-center justify-center gap-2 transition-all ${
                selectedRole === 'VENDOR'
                  ? 'bg-white text-[#111111] shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
                  : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              <Building2 className={`w-4 h-4 ${selectedRole === 'VENDOR' ? 'text-[#7C5CFF]' : ''}`} />
              <span>Firma / CRM</span>
            </button>
          </div>

          {/* Role Status Banner */}
          <div className={`p-4 rounded-[18px] text-[13px] flex items-center gap-3 transition-colors ${
            selectedRole === 'COUPLE' ? 'bg-[#7C5CFF]/5 border border-[#7C5CFF]/15 text-[#7C5CFF]' : 'bg-[#111111] text-white'
          }`}>
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-medium">
                {selectedRole === 'COUPLE' ? 'Çift Kontrol Merkezi Yükleniyor' : 'Kurumsal Satıcı CRM Modu'}
              </p>
              <p className={`text-[11px] mt-0.5 ${selectedRole === 'COUPLE' ? 'text-[#7C5CFF]/80' : 'text-white/60'}`}>
                {selectedRole === 'COUPLE' ? 'Bütçe, görevler ve davetli listesine erişim.' : 'Talepler, teklif hazırlama ve finans takibi.'}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-[#111111] mb-1.5">E-posta Adresi</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={selectedRole === 'COUPLE' ? 'selin@dusunuyoruz.com' : 'info@bosphoruspalace.com'}
                  className="w-full h-[52px] pl-11 pr-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[16px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF] focus:bg-white focus:ring-4 focus:ring-[#7C5CFF]/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-[52px] pl-11 pr-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[16px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF] focus:bg-white focus:ring-4 focus:ring-[#7C5CFF]/10 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[56px] bg-[#111111] hover:bg-[#333333] text-white font-medium text-[15px] rounded-[18px] transition-all shadow-sm flex items-center justify-center gap-2 pt-0.5"
            >
              <span>{selectedRole === 'COUPLE' ? 'Çift Paneline Giriş Yap' : 'Firma CRM Paneline Giriş Yap'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Info */}
          <p className="text-center text-[12px] text-[#999999]">
            Henüz hesabınız yok mu? <Link href="/cift/onboarding" className="text-[#7C5CFF] font-medium hover:underline">Hemen Kurun</Link>
          </p>

        </div>

      </main>

      {/* Footer Disclaimer */}
      <footer className="text-center text-[12px] text-[#999999] z-10">
        WedyPlan Wedding OS • Güvenli Rol Tabanlı Erişim Sistemi
      </footer>

    </div>
  );
}