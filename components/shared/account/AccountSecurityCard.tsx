'use client';

import React, { useEffect, useState } from 'react';
import {
  changeAccountEmailAction,
  changeAccountPasswordAction,
  getAccountSecurity,
} from '@/lib/actions/account';

export function AccountSecurityCard() {
  const [email, setEmail] = useState('');
  const [hasPassword, setHasPassword] = useState(true);
  const [loading, setLoading] = useState(true);

  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [confirmCurrentEmail, setConfirmCurrentEmail] = useState('');
  const [emailBusy, setEmailBusy] = useState(false);
  const [emailMsg, setEmailMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await getAccountSecurity();
    if (res.success && res.data) {
      setEmail(res.data.email);
      setHasPassword(res.data.hasPassword);
      setNewEmail(res.data.email);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailBusy(true);
    setEmailMsg(null);
    const res = await changeAccountEmailAction({
      newEmail,
      currentPassword: emailPassword,
      confirmCurrentEmail,
    });
    setEmailBusy(false);
    if (res.success) {
      setEmailMsg({ ok: true, text: res.message });
      setEmailPassword('');
      setConfirmCurrentEmail('');
      await load();
    } else {
      setEmailMsg({ ok: false, text: res.error || 'Güncellenemedi.' });
    }
  };

  const onPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordBusy(true);
    setPasswordMsg(null);
    const res = await changeAccountPasswordAction({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    setPasswordBusy(false);
    if (res.success) {
      setPasswordMsg({ ok: true, text: res.message });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      await load();
    } else {
      setPasswordMsg({ ok: false, text: res.error || 'Güncellenemedi.' });
    }
  };

  if (loading) {
    return <p className="text-[13px] text-[#86868b]">Hesap bilgileri yükleniyor…</p>;
  }

  return (
    <div className="space-y-5">
      <form onSubmit={onEmailSubmit} className="space-y-3 rounded-2xl border border-black/8 bg-white/70 p-5">
        <div>
          <h4 className="text-[14px] font-semibold text-[#1d1d1f]">Giriş e-postası</h4>
          <p className="mt-0.5 text-[12px] text-[#86868b]">Şu an: {email}</p>
        </div>
        <label className="block text-[12px] text-[#86868b]">
          Yeni e-posta
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="mt-1 h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0071e3]"
          />
        </label>
        {hasPassword ? (
          <label className="block text-[12px] text-[#86868b]">
            Mevcut şifre
            <input
              type="password"
              required
              value={emailPassword}
              onChange={(e) => setEmailPassword(e.target.value)}
              className="mt-1 h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0071e3]"
            />
          </label>
        ) : (
          <label className="block text-[12px] text-[#86868b]">
            Onay için mevcut e-postanız
            <input
              type="email"
              required
              value={confirmCurrentEmail}
              onChange={(e) => setConfirmCurrentEmail(e.target.value)}
              placeholder={email}
              className="mt-1 h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0071e3]"
            />
          </label>
        )}
        {emailMsg ? (
          <p className={`text-[12px] ${emailMsg.ok ? 'text-emerald-600' : 'text-[#ff375f]'}`}>{emailMsg.text}</p>
        ) : null}
        <button type="submit" disabled={emailBusy} className="apple-btn apple-btn-solid apple-btn-compact apple-btn-inline">
          {emailBusy ? 'Kaydediliyor…' : 'E-postayı güncelle'}
        </button>
      </form>

      <form onSubmit={onPasswordSubmit} className="space-y-3 rounded-2xl border border-black/8 bg-white/70 p-5">
        <div>
          <h4 className="text-[14px] font-semibold text-[#1d1d1f]">
            {hasPassword ? 'Şifre değiştir' : 'Şifre belirle'}
          </h4>
          <p className="mt-0.5 text-[12px] text-[#86868b]">
            {hasPassword
              ? 'En az 6 karakter. Değişiklikten sonra mevcut oturumunuz açık kalır.'
              : 'Google ile girdiniz. E-posta girişi için bir şifre belirleyin.'}
          </p>
        </div>
        {hasPassword ? (
          <label className="block text-[12px] text-[#86868b]">
            Mevcut şifre
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0071e3]"
            />
          </label>
        ) : null}
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-[12px] text-[#86868b]">
            Yeni şifre
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0071e3]"
            />
          </label>
          <label className="block text-[12px] text-[#86868b]">
            Yeni şifre tekrar
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0071e3]"
            />
          </label>
        </div>
        {passwordMsg ? (
          <p className={`text-[12px] ${passwordMsg.ok ? 'text-emerald-600' : 'text-[#ff375f]'}`}>{passwordMsg.text}</p>
        ) : null}
        <button type="submit" disabled={passwordBusy} className="apple-btn apple-btn-solid apple-btn-compact apple-btn-inline">
          {passwordBusy ? 'Kaydediliyor…' : hasPassword ? 'Şifreyi güncelle' : 'Şifreyi kaydet'}
        </button>
      </form>
    </div>
  );
}

export default AccountSecurityCard;
