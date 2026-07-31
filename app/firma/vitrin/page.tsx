// app/firma/vitrin/page.tsx
'use client';

import { useEffect, useState, useTransition } from 'react';
import { getVendorProfile, updateVendorProfile } from '@/lib/actions/vendor-profile';

export default function VitrinPage() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [vendor, setVendor] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('MEKAN');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');

  const loadProfile = async () => {
    setLoading(true);
    const res = await getVendorProfile();
    if (res.success && res.data) {
      setVendor(res.data);
      setName(res.data.name || '');
      setCategory(res.data.category || 'MEKAN');
      setCity(res.data.city || '');
      setDescription(res.data.description || '');
      setStartingPrice(res.data.startingPrice ? String(res.data.startingPrice) : '');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendor?.id) return;

    setSuccessMessage('');
    startTransition(async () => {
      const res = await updateVendorProfile({
        id: vendor.id,
        name,
        category,
        city,
        description,
        startingPrice: parseFloat(startingPrice) || 0,
      });

      if (res.success) {
        setSuccessMessage('Vitrin bilgileriniz başarıyla güncellendi!');
        await loadProfile();
      }
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Vitrin bilgileri yükleniyor...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Firma Vitrin Yönetimi</h1>
        <p className="text-sm text-gray-500 mt-1">
          Çiftlerin arama sonuçlarında göreceği firma bilgilerinizi ve vitrin detaylarınızı düzenleyin.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl font-medium">
          ✓ {successMessage}
        </div>
      )}

      <form onSubmit={handleUpdate} className="p-6 bg-white/80 backdrop-blur-md rounded-2xl border shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-3">Temel Firma Bilgileri</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Firma Ünvanı *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Hizmet Kategorisi</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white"
            >
              <option value="MEKAN">Düğün Mekanı</option>
              <option value="FOTOGRAF">Fotoğraf & Video</option>
              <option value="ORGANIZASYON">Organizasyon</option>
              <option value="MUZIK">Müzik & Orkestra</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Bulunduğu Şehir</label>
            <input
              type="text"
              placeholder="örn. İstanbul"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3.5 py-2 border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Başlangıç Fiyatı (₺)</label>
            <input
              type="number"
              placeholder="0.00"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
              className="w-full px-3.5 py-2 border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Firma Hakkında / Tanıtım Yazısı</label>
          <textarea
            rows={4}
            placeholder="Hizmet standartlarınızı, tecrübelerinizi ve sunduğunuz imkanları detaylandırın..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2 border rounded-xl text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
        >
          {isPending ? 'Güncelleniyor...' : 'Vitrin Değişikliklerini Kaydet'}
        </button>
      </form>
    </div>
  );
}