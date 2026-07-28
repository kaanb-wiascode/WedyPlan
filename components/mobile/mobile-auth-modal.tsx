"use client";

import React, { useState } from "react";
import { ShieldCheck, Fingerprint, Lock, Mail, Smartphone, ArrowRight, CheckCircle2 } from "lucide-react";
import { MobileAuthPlatform } from "@/lib/mobile/mobile-auth";

interface MobileAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const MobileAuthModal: React.FC<MobileAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [method, setMethod] = useState<"SELECT" | "PHONE" | "BIOMETRIC">("SELECT");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBiometricAuth = async () => {
    setLoading(true);
    setStatusMessage("Biometric Challenge Doğrulanıyor...");
    const res = await MobileAuthPlatform.authenticateBiometrics();
    setLoading(false);

    if (res.success) {
      setStatusMessage("Face ID / Biyometrik Onay Başarılı!");
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 800);
    } else {
      setStatusMessage(res.error || "Biyometrik doğrulama başarısız.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div className="w-full max-w-sm bg-[#F5F4F0] rounded-[32px] border border-white/80 p-6 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#111111] text-[#F5F4F0] flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <h3 className="font-serif-editorial text-2xl font-semibold text-[#111111]">
            Güvenli Giriş
          </h3>
          <p className="text-xs text-[#666666]">
            Passkey, Biyometrik Doğrulama veya OTP ile devam edin.
          </p>
        </div>

        {statusMessage && (
          <div className="p-3 bg-white/80 border border-black/10 rounded-xl text-center text-xs text-[#111111] font-medium animate-fade-in">
            {statusMessage}
          </div>
        )}

        {method === "SELECT" && (
          <div className="space-y-3">
            <button
              onClick={handleBiometricAuth}
              disabled={loading}
              className="flex items-center justify-center gap-3 w-full h-12 bg-[#111111] text-[#F5F4F0] text-xs font-semibold rounded-2xl shadow-sm hover:bg-[#222222] transition-all"
            >
              <Fingerprint className="w-5 h-5 text-[#D4AF37]" />
              <span>Face ID / Touch ID ile Giriş</span>
            </button>

            <button
              onClick={() => setMethod("PHONE")}
              className="flex items-center justify-center gap-3 w-full h-12 bg-white/70 border border-black/10 text-[#111111] text-xs font-semibold rounded-2xl hover:bg-white transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>Telefon / OTP ile Giriş</span>
            </button>
          </div>
        )}

        {method === "PHONE" && (
          <div className="space-y-4">
            {!otpSent ? (
              <div className="space-y-3">
                <input
                  type="tel"
                  placeholder="5XX XXX XX XX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full h-12 px-4 bg-white/80 border border-black/10 rounded-2xl text-sm outline-none focus:border-[#111111]"
                />
                <button
                  onClick={() => setOtpSent(true)}
                  className="w-full h-12 bg-[#111111] text-[#F5F4F0] text-xs font-semibold rounded-2xl shadow-sm"
                >
                  SMS Doğrulama Kodu Gönder
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="6 Haneli Kod"
                  className="w-full h-12 px-4 bg-white/80 border border-black/10 rounded-2xl text-center font-mono text-lg tracking-widest outline-none focus:border-[#111111]"
                />
                <button
                  onClick={() => {
                    if (onSuccess) onSuccess();
                    onClose();
                  }}
                  className="w-full h-12 bg-[#111111] text-[#F5F4F0] text-xs font-semibold rounded-2xl shadow-sm"
                >
                  Kodu Onayla
                </button>
              </div>
            )}
            <button
              onClick={() => setMethod("SELECT")}
              className="w-full text-center text-xs text-[#666666] hover:underline"
            >
              Geri Dön
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full text-center text-xs text-[#86868B] hover:text-[#111111]"
        >
          Kapat
        </button>
      </div>
    </div>
  );
};