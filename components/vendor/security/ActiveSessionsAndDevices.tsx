"use client";

import React from "react";

export default function ActiveSessionsAndDevices({
  sessions,
  onRevokeSession,
}: {
  sessions: any[];
  onRevokeSession: (sessionId: string) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          💻 Aktif Cihazlar & Oturum Geçmişi ({sessions.length} Cihaz)
        </span>
      </div>

      <div className="space-y-3">
        {sessions.map((sess) => (
          <div
            key={sess.id}
            className={"p-4 rounded-2xl border flex justify-between items-center transition " +
              (sess.isCurrent
                ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900/40"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-700/60")
            }
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{sess.deviceIcon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{sess.deviceName}</h4>
                  {sess.isCurrent && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Bu Cihaz (Mevcut)
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {sess.ipAddress} • {sess.location} • {sess.lastActive}
                </p>
              </div>
            </div>

            {!sess.isCurrent && (
              <button
                onClick={() => onRevokeSession(sess.id)}
                className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300 text-[10px] font-bold hover:bg-rose-100 transition"
              >
                Oturumu Kapat ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
