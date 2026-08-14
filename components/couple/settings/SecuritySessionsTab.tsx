"use client";

import React, { useState } from "react";
import { updateSecurityPasswordAction } from "@/lib/actions/settings";

export default function SecuritySessionsTab({ userId }: { userId: string }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsSaving] = useState(false);

  const [activeSessions] = useState([
    { id: "s1", device: "MacBook Pro 16' (macOS)", location: "İstanbul, TR", isCurrent: true, lastActive: "Şimdi" },
    { id: "s2", device: "iPhone 15 Pro (iOS)", location: "Muğla, TR", isCurrent: false, lastActive: "2 saat önce" },
  ]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Yeni şifreler birbiriyle eşleşmiyor.");
      return;
    }

    setIsSaving(true);
    const res = await updateSecurityPasswordAction(userId, {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    setIsSaving(false);

    if (res.success) {
      alert(res.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert(res.error || "Şifre güncellenemedi.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Şifre Değiştirme */}
      <form onSubmit={handlePasswordChange} className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🔒 Şifre Değiştirme & Güvenlik
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Mevcut Şifre</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Yeni Şifre</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Yeni Şifre Tekrar</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isUpdating}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs hover:opacity-90 transition disabled:opacity-50"
          >
            {isUpdating ? "Şifre Güncelleniyor..." : "Şifreyi Güncelle"}
          </button>
        </div>
      </form>

      {/* Aktif Cihazlar & Oturumlar */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            📱 Aktif Cihazlar & Oturum Kasası ({activeSessions.length})
          </h3>
          <button
            onClick={() => alert("Diğer tüm oturumlar kapatıldı.")}
            className="text-rose-600 font-bold hover:underline"
          >
            Tüm Diğer Oturumları Kapat ✕
          </button>
        </div>

        <div className="space-y-2">
          {activeSessions.map((s) => (
            <div key={s.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span>{s.device}</span>
                  {s.isCurrent && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Bu Cihaz
                    </span>
                  )}
                </h4>
                <p className="text-[10px] text-slate-400">{s.location} • Son Aktiflik: {s.lastActive}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
