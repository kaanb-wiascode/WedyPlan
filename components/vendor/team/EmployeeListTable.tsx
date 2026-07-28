"use client";

import React from "react";

export default function EmployeeListTable({
  employees,
  onSelectEmployee,
}: {
  employees: any[];
  onSelectEmployee: (emp: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          👥 Kayıtlı Personel Kadrosu ({employees.length} Kişi)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Personel Adı / İletişim</th>
            <th className="py-3 px-2">Departman</th>
            <th className="py-3 px-2">Sistem Rolü</th>
            <th className="py-3 px-2">Performans</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {emp.fullName}
                <span className="block text-[10px] text-slate-400 font-normal">{emp.phone} • {emp.email}</span>
              </td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300 font-medium">
                {emp.department}
              </td>
              <td className="py-3 px-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {emp.role}
                </span>
              </td>
              <td className="py-3 px-2 font-bold text-amber-500">
                ★ {emp.performanceScore || "4.9"}
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (emp.status === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300")
                  }
                >
                  {emp.status === "ACTIVE" ? "✓ Aktif" : "İzinli"}
                </span>
              </td>
              <td className="py-3 px-2 text-right">
                <button
                  onClick={() => onSelectEmployee(emp)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-bold hover:opacity-90 transition"
                >
                  Yetki & Profil →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
