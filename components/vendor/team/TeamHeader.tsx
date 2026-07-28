"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TeamHeader({
  totalEmployeesCount,
  activeStaffCount,
  onLeaveCount,
  onOpenInviteModal,
}: {
  totalEmployeesCount: number;
  activeStaffCount: number;
  onLeaveCount: number;
  onOpenInviteModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              ✦ Human Resources & Workforce OS
            </span>
            <span className="text-xs text-slate-400">Ekip, Yetki & İş Gücü Yönetimi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Team & Staff Management</h1>
        </div>

        <button
          onClick={onOpenInviteModal}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:shadow-lg transition flex items-center gap-2"
        >
          + Yeni Ekip Üyesi Davet Et
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-blue-600 font-medium uppercase">Kayıtlı Toplam Personel</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{totalEmployeesCount} Personel</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">5 Farklı Departman</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Aktif Sahada Görevli</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">{activeStaffCount} Personel</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Vardiya & Etkinlik Atamalı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">İzinli / Mazeretli</span>
          <div className="text-2xl font-bold mt-1 text-amber-600">{onLeaveCount} Personel</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Onaylı İzin Sürecinde</span>
        </motion.div>
      </div>
    </div>
  );
}
