// app/satici/paketler/page.tsx
'use client';

import { useEffect, useState, useTransition } from 'react';
import {
  getVendorPackages,
  createVendorPackage,
  deleteVendorPackage,
} from '@/lib/actions/vendor-profile';

export default function PaketlerPage() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [packages, setPackages] = useState<any[]>([]);

  // Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const loadPackages = async () => {
    setLoading(true);
    const res = await getVendorPackages();
    if (res.success && res.data) {
      setPackages(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    startTransition(async () => {
      const res = await createVendorPackage({
        title,
        price: parseFloat(price),
        description,
      });

      if (res.success) {
        setTitle('');
        setPrice('');
        setDescription('');
        await loadPackages();
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteVendorPackage(id);
      if (res.success) {
        await loadPackages();
      }
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Paketler yükleniyor...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Fiyat Paketleri & Seçenekler</h1>
        <p className="text-sm text-gray-500 mt-1">
          Çiftlere sunacağınız standart, gold veya vip düğün paketlerinizi oluşturun.
        </p>
      </div>

      {/* Yeni Paket Ekleme Formu */}
      <form onSubmit={handleAddPackage} className="p-5 bg-white/80 backdrop-blur-md rounded-2xl border shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Yeni Hizmet Paketi Tanımla</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Paket Adı (örn. Gold Düğün Paketi) *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3.5 py-2 border rounded-xl text-sm"
            required
          />
          <input
            type="number"
            placeholder="Paket Fiyatı (₺) *"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-3.5 py-2 border rounded-xl text-sm"
            required
          />
        </div>
        <textarea
          rows={3}
          placeholder="Paket kapsamındaki hizmetler ve detaylar..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3.5 py-2 border rounded-xl text-sm"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending ? 'Paket Kaydediliyor...' : 'Paketi Yayınla'}
        </button>
      </form>

      {/* Paket Kartları */}
      {packages.length === 0 ? (
        <div className="p-12 text-center bg-white/50 rounded-2xl border text-gray-500">
          Henüz eklenmiş bir hizmet paketiniz bulunmuyor.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="p-6 bg-white/80 backdrop-blur-md rounded-2xl border shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800">{pkg.title}</h3>
                <div className="text-2xl font-extrabold text-indigo-600">
                  {pkg.price?.toLocaleString('tr-TR')} ₺
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pt-2 border-t">
                  {pkg.description || 'Detay açıklaması girilmemiş.'}
                </p>
              </div>

              <div className="pt-3 border-t flex justify-end">
                <button
                  onClick={() => handleDelete(pkg.id)}
                  disabled={isPending}
                  className="text-red-500 hover:text-red-700 text-xs font-semibold disabled:opacity-50"
                >
                  Paketi Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}