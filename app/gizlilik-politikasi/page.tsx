'use client';

import React from 'react';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/homepage/PublicFooter';
import GlassCard from '@/components/shared/ui/GlassCard';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1D1D1F] selection:bg-[#0071e3] selection:text-white">
      <PublicNavbar />

      <main className="pt-16 pb-24 max-w-4xl mx-auto px-4 sm:px-8">
        
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="p-3 bg-emerald-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Gizlilik Politikası (KVKK)</h1>
          <p className="text-gray-500">Son Güncelleme: 1 Ağustos 2026</p>
        </div>

        <GlassCard className="p-8 md:p-12 border-white/60 bg-white/70">
          <article className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-[#1D1D1F] prose-p:text-gray-600 prose-p:font-light prose-li:text-gray-600 prose-li:font-light">
            <h2>1. Veri Sorumlusu</h2>
            <p>
              WedyPlan ("Şirket", "Biz", "Bize" veya "Bizi") olarak, kullanıcılarımızın kişisel verilerinin gizliliğine ve güvenliğine en yüksek önemi veriyoruz. 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca veri sorumlusu sıfatıyla hareket etmekteyiz.
            </p>

            <h2>2. Toplanan Kişisel Veriler</h2>
            <p>Platformumuzu (çift veya firma olarak) kullandığınızda aşağıdaki veri tiplerini toplayabiliriz:</p>
            <ul>
              <li><strong>Kimlik ve İletişim Verileri:</strong> Ad, soyad, telefon numarası, e-posta adresi.</li>
              <li><strong>Planlama Verileri:</strong> Düğün tarihi, tahmini bütçe, misafir listesi, görevler.</li>
              <li><strong>Finansal Veriler:</strong> Ödeme yöntemleri, fatura bilgileri (güvenli ödeme altyapısı sağlayıcılarımız aracılığıyla işlenir).</li>
              <li><strong>Kullanım ve Teknik Veriler:</strong> IP adresi, tarayıcı bilgileri, platform üzerindeki hareketleriniz, AI asistanımızla yapılan konuşma logları.</li>
            </ul>

            <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
            <p>Topladığımız kişisel veriler; platform hizmetlerinin sunulabilmesi, AI planlayıcı ve öneri motorunun (AI Matching Engine) doğru sonuçlar üretebilmesi, ödemelerin güvenli bir şekilde alınması ve yasal yükümlülüklerimizin yerine getirilmesi amaçlarıyla işlenmektedir.</p>

            <h2>4. Veri Güvenliği ve Yapay Zeka</h2>
            <p>
              Yapay Zeka (AI) destekli özelliklerimizi kullanırken girdiğiniz veriler, hizmet kalitesini artırmak için anonimleştirilerek model eğitiminde kullanılabilir. Hassas verileriniz endüstri standartlarında (TLS/SSL) şifrelenerek korunmaktadır.
            </p>

            <h2>5. Haklarınız</h2>
            <p>
              KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, silinmesini veya yok edilmesini talep etme haklarına sahipsiniz. Talepleriniz için <strong>kvkk@wedyplan.com</strong> adresi üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </article>
        </GlassCard>
      </main>

      <PublicFooter />
    </div>
  );
}