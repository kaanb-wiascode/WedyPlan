'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { AdminSidebar, AdminTab } from '@/components/admin/AdminSidebar';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  Store, 
  ShieldCheck, 
  UserPlus, 
  Plus, 
  Check, 
  X,
  Radio,
  Ghost,
  Megaphone,
  MousePointerClick,
  Loader2
} from 'lucide-react';

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('executive');

  // Supabase'den Dolacak Canlı State'ler
  const [couples, setCouples] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modallar
  const [isCoupleModalOpen, setIsCoupleModalOpen] = useState(false);
  const [newCouple, setNewCouple] = useState({ name: '', date: '', city: '', budget: '' });

  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: '', category: 'Mekan', city: '' });

  // CANLI VERİ ÇEKME & REALTIME DİNLEME
  useEffect(() => {
    fetchInitialData();

    // Supabase Realtime Aboneliği: Veritabanında Değişiklik Olduğunda Ekran Anında Güncellenir
    const channel = supabase
      .channel('admin-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'couples' }, () => fetchCouples())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vendors' }, () => fetchVendors())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    await Promise.all([fetchCouples(), fetchVendors()]);
    setLoading(false);
  };

  const fetchCouples = async () => {
    const { data, error } = await supabase
      .from('couples')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data && !error) setCouples(data);
  };

  const fetchVendors = async () => {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) setVendors(data);
  };

  // GERÇEK SUPABASE'E ÇİFT EKLEME
  const handleAddCouple = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouple.name) return;

    const { error } = await supabase.from('couples').insert([
      {
        names: newCouple.name,
        wedding_date: newCouple.date || 'Belirtilmedi',
        city: newCouple.city || 'İstanbul',
        budget: Number(newCouple.budget) || 0,
        status: 'CONFIRMED'
      }
    ]);

    if (!error) {
      setNewCouple({ name: '', date: '', city: '', budget: '' });
      setIsCoupleModalOpen(false);
      fetchCouples();
    }
  };

  // GERÇEK SUPABASE'E TEDARİKÇİ EKLEME
  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendor.name) return;

    const { error } = await supabase.from('vendors').insert([
      {
        name: newVendor.name,
        category: newVendor.category,
        city: newVendor.city || 'İstanbul',
        is_verified: true,
        trust_score: 100
      }
    ]);

    if (!error) {
      setNewVendor({ name: '', category: 'Mekan', city: '' });
      setIsVendorModalOpen(false);
      fetchVendors();
    }
  };

  // GERÇEK SUPABASE'DE ONAY DURUMU DEĞİŞTİRME
  const toggleVendorStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('vendors')
      .update({ is_verified: !currentStatus })
      .eq('id', id);

    if (!error) {
      fetchVendors();
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">
        
        {/* EXECUTIVE KONTROL PANELİ */}
        {activeTab === 'executive' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-amber-200/60 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sistem Yönetim Kumanda Merkezi</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-white tracking-tight">
                  Executive Kontrol Paneli (Canlı Veri)
                </h1>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-200/60 text-emerald-600 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Supabase Realtime Bağlı
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-12 text-zinc-400 gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
                <span className="text-xs font-medium">Supabase verileri yükleniyor...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
                  <span className="text-xs text-zinc-500">Kayıtlı Çiftler (Supabase)</span>
                  <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">{couples.length}</div>
                </div>

                <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
                  <span className="text-xs text-zinc-500">Kayıtlı Tedarikçiler (Supabase)</span>
                  <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">{vendors.length}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ÇİFT YÖNETİMİ PANELİ */}
        {activeTab === 'couples' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800">
              <h2 className="text-xl font-serif font-bold">Supabase Çift Verileri ({couples.length})</h2>
              <button onClick={() => setIsCoupleModalOpen(true)} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer">
                + Canlı Çift Kaydet
              </button>
            </div>

            <div className="space-y-2">
              {couples.length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-400 bg-white/80 dark:bg-zinc-900/60 rounded-2xl">
                  Henüz kayıtlı çift bulunmuyor.
                </div>
              ) : (
                couples.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm">{c.names}</h4>
                      <p className="text-xs text-zinc-500">{c.city} • Düğün Tarihi: {c.wedding_date} • Bütçe: ₺{c.budget}</p>
                    </div>
                    <span className="text-xs bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full border border-emerald-200 font-semibold">{c.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TEDARİKÇİ YÖNETİMİ PANELİ */}
        {activeTab === 'vendors' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800">
              <h2 className="text-xl font-serif font-bold">Supabase Tedarikçiler ({vendors.length})</h2>
              <button onClick={() => setIsVendorModalOpen(true)} className="bg-amber-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer">
                + Canlı Firma Ekle
              </button>
            </div>

            <div className="space-y-2">
              {vendors.length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-400 bg-white/80 dark:bg-zinc-900/60 rounded-2xl">
                  Henüz kayıtlı tedarikçi bulunmuyor.
                </div>
              ) : (
                vendors.map((v) => (
                  <div key={v.id} className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm">{v.name}</h4>
                      <p className="text-xs text-zinc-500">Kategori: {v.category} • Şehir: {v.city}</p>
                    </div>
                    <button onClick={() => toggleVendorStatus(v.id, v.is_verified)} className={`text-xs font-bold px-3 py-1 rounded-full border cursor-pointer ${v.is_verified ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200' : 'bg-rose-500/10 text-rose-600 border-rose-200'}`}>
                      {v.is_verified ? 'Onaylı' : 'Onay Ver'}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>

      {/* MODALLAR */}
      {isCoupleModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg">Supabase'e Çift Kaydet</h3>
            <form onSubmit={handleAddCouple} className="space-y-3">
              <input type="text" placeholder="Çift İsimleri (Örn: Eda & Mert)" value={newCouple.name} onChange={(e) => setNewCouple({ ...newCouple, name: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" required />
              <input type="text" placeholder="Düğün Tarihi" value={newCouple.date} onChange={(e) => setNewCouple({ ...newCouple, date: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" />
              <input type="text" placeholder="Şehir" value={newCouple.city} onChange={(e) => setNewCouple({ ...newCouple, city: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" />
              <input type="number" placeholder="Bütçe (TL)" value={newCouple.budget} onChange={(e) => setNewCouple({ ...newCouple, budget: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsCoupleModalOpen(false)} className="flex-1 h-10 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs">İptal</button>
                <button type="submit" className="flex-1 h-10 bg-amber-500 text-white rounded-xl text-xs font-bold">Veritabanına Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isVendorModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg">Supabase'e Tedarikçi Kaydet</h3>
            <form onSubmit={handleAddVendor} className="space-y-3">
              <input type="text" placeholder="Firma Adı" value={newVendor.name} onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" required />
              <input type="text" placeholder="Şehir" value={newVendor.city} onChange={(e) => setNewVendor({ ...newVendor, city: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsVendorModalOpen(false)} className="flex-1 h-10 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs">İptal</button>
                <button type="submit" className="flex-1 h-10 bg-amber-500 text-white rounded-xl text-xs font-bold">Firmayı Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}