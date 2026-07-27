'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthCardLayout } from '@/components/public/auth/AuthCardLayout';
import { OtpInput } from '@/components/public/auth/OtpInput';
import { MailCheck, CheckCircle2, RotateCcw } from 'lucide-react';

function EmailVerificationContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'hesabınızın e-postası';
  const router = useRouter();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOtpComplete = (code: string) => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/cift');
      }, 1200);
    }, 800);
  };

  return (
    <AuthCardLayout
      title="E-Posta Doğrulama"
      subtitle={`${email} adresine gönderilen 6 haneli doğrulama kodunu giriniz.`}
    >
      {isSuccess ? (
        <div className="bg-emerald-50 border border-emerald-200/80 p-6 rounded-[28px] text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
          <h3 className="font-serif font-bold text-[18px] text-emerald-900">
            Hesabınız Doğrulandı!
          </h3>
          <p className="text-[12px] text-emerald-800">
            Düğün komuta merkezinize yönlendiriliyorsunuz...
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-3 bg-pink-500/10 text-[#E6007E] rounded-2xl w-fit mx-auto">
            <MailCheck className="w-8 h-8 text-[#E6007E]" />
          </div>

          <OtpInput length={6} onComplete={handleOtpComplete} />

          {isVerifying && (
            <p className="text-center text-[12px] font-bold text-[#E6007E] animate-pulse">
              Kod doğrulanıyor...
            </p>
          )}

          <div className="text-center pt-2">
            <button
              onClick={() => alert('Yeni doğrulama kodu e-posta adresinize tekrar gönderildi.')}
              className="text-[11px] font-bold text-[#86868B] hover:text-[#E6007E] transition inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Kod gelmedi mi? Tekrar Gönder
            </button>
          </div>
        </div>
      )}
    </AuthCardLayout>
  );
}

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Doğrulama Yükleniyor...</div>}>
      <EmailVerificationContent />
    </Suspense>
  );
}