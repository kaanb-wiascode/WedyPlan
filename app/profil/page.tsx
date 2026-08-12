'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, updateProfile, sendPasswordResetEmail, User } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    try {
      await updateProfile(user, { displayName });
      alert('Profil bilgileriniz başarıyla güncellendi! 🎉');
    } catch (error) {
      console.error('Profil güncelleme hatası:', error);
      alert('Güncelleme sırasında bir hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      alert(`Şifre sıfırlama bağlantısı ${user.email} adresine gönderildi! 📩`);
    } catch (error) {
      console.error('Şifre sıfırlama hatası:', error);
      alert('Şifre sıfırlama e-postası gönderilemedi.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBFD]">
        <p className="text-[#4A154B] font-bold">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800 flex flex-col">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#0071e3]">Plan</span>
        </Link>
        <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-[#0071e3]">
          ← Ana Sayfaya Dön
        </Link>
      </nav>

      <div className="flex-grow max-w-3xl mx-auto w-full px-4 py-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-[#4A154B]">Hesabım & Profil 👤</h1>
          <p className="text-sm text-slate-500">Kişisel bilgilerinizi ve hesap ayarlarınızı buradan yönetebilirsiniz.</p>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-3xl border border-purple-100 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-slate-100 text-center sm:text-left">
            <img
              src={user?.photoURL || `[https://ui-avatars.com/api/?name=$](https://ui-avatars.com/api/?name=$){user?.displayName || user?.email}&background=E6007E&color=fff&size=128`}
              alt="Profil"
              className="w-24 h-24 rounded-full object-cover border-4 border-purple-50 shadow-md"
            />
            <div className="mt-2">
              <h2 className="text-xl font-bold text-slate-800">{user?.displayName || 'İsimsiz Kullanıcı'}</h2>
              <p className="text-sm text-slate-500">{user?.email}</p>
              <span className="inline-block mt-3 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">
                ✓ Doğrulanmış Hesap
              </span>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <h3 className="text-sm font-bold text-[#4A154B]">Kişisel Bilgiler</h3>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">Görünür İsim (Ad Soyad)</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3]"
              />
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#4A154B] hover:bg-purple-900 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition shadow disabled:opacity-50"
            >
              {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </form>

          <div className="pt-8 border-t border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-[#4A154B]">Güvenlik & Şifre</h3>
            <p className="text-xs text-slate-500">Şifrenizi unuttuysanız veya değiştirmek istiyorsanız hesabınızın bağlı olduğu e-posta adresine bir sıfırlama bağlantısı talep edebilirsiniz.</p>
            <button
              onClick={handleResetPassword}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-6 py-3.5 rounded-xl transition w-full sm:w-auto"
            >
              🔐 Şifre Sıfırlama E-Postası Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}