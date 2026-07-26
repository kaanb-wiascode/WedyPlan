import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Bell, Search } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex">
      {/* Sol Menü */}
      <AdminSidebar />

      {/* Sağ Ana Alan */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Üst Bar Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-[12px] text-slate-500 w-64 border border-slate-200">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Firma, Çift veya ID Ara..." className="bg-transparent outline-none w-full" />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                AD
              </div>
              <div className="hidden sm:block">
                <span className="block text-[12px] font-bold text-slate-700">Sistem Admin</span>
                <span className="block text-[10px] text-slate-500">Kurucu Yetkisi</span>
              </div>
            </div>
          </div>
        </header>

        {/* Sayfa İçeriği */}
        <main className="p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}