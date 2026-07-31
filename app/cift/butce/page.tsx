// app/cift/butce/page.tsx
'use client';

import { useEffect, useState, useTransition } from 'react';
import { getBudgetItems, createBudgetItem, deleteBudgetItem } from '@/lib/actions/budget';

export default function BudgetPage() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [budgetData, setBudgetData] = useState<{
    items: any[];
    summary: { totalBudget: number; totalSpent: number; remaining: number };
  }>({
    items: [],
    summary: { totalBudget: 0, totalSpent: 0, remaining: 0 },
  });

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Mekan');
  const [allocatedAmount, setAllocatedAmount] = useState('');

  // Bütçe verilerini çek
  const loadData = async () => {
    setLoading(true);
    const res = await getBudgetItems();
    if (res.success && res.data) {
      setBudgetData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Yeni Kalem Ekleme
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !allocatedAmount) return;

    startTransition(async () => {
      const res = await createBudgetItem({
        title,
        category,
        allocatedAmount: parseFloat(allocatedAmount),
      });

      if (res.success) {
        setTitle('');
        setAllocatedAmount('');
        await loadData();
      }
    });
  };

  // Kalem Silme
  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteBudgetItem(id);
      if (res.success) {
        await loadData();
      }
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Bütçe verileri yükleniyor...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Düğün Bütçe Yönetimi</h1>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white/70 backdrop-blur-md rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Toplam Planlanan</p>
          <p className="text-2xl font-bold text-indigo-600">
            {budgetData.summary.totalBudget.toLocaleString('tr-TR')} ₺
          </p>
        </div>
        <div className="p-4 bg-white/70 backdrop-blur-md rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Harcandığı Belirtilen</p>
          <p className="text-2xl font-bold text-emerald-600">
            {budgetData.summary.totalSpent.toLocaleString('tr-TR')} ₺
          </p>
        </div>
        <div className="p-4 bg-white/70 backdrop-blur-md rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Kalan Bütçe</p>
          <p className="text-2xl font-bold text-amber-600">
            {budgetData.summary.remaining.toLocaleString('tr-TR')} ₺
          </p>
        </div>
      </div>

      {/* Yeni Kalem Ekleme Formu */}
      <form onSubmit={handleAddItem} className="p-4 bg-white/80 rounded-xl border space-y-4">
        <h2 className="text-lg font-semibold">Yeni Bütçe Kalemi Ekle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Gider Başlığı (örn. Fotoğrafçı)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
          >
            <option value="Mekan">Mekan & Müzik</option>
            <option value="Fotograf">Fotoğraf & Video</option>
            <option value="Giyim">Gelinlik & Damatlık</option>
            <option value="Diger">Diğer</option>
          </select>
          <input
            type="number"
            placeholder="Tahmini Tutar (₺)"
            value={allocatedAmount}
            onChange={(e) => setAllocatedAmount(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium disabled:opacity-50"
        >
          {isPending ? 'Kaydediliyor...' : 'Kalem Ekle'}
        </button>
      </form>

      {/* Bütçe Kalemleri Listesi */}
      <div className="bg-white/80 rounded-xl border overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-sm font-medium text-gray-600">
              <th className="p-3">Başlık</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Planlanan Tutar</th>
              <th className="p-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {budgetData.items.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Henüz bir bütçe kalemi eklenmedi.
                </td>
              </tr>
            ) : (
              budgetData.items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3 text-gray-500">{item.category}</td>
                  <td className="p-3 font-semibold">
                    {item.allocatedAmount?.toLocaleString('tr-TR')} ₺
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={isPending}
                      className="text-red-500 hover:text-red-700 text-xs font-medium disabled:opacity-50"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}