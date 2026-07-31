// app/firmalar/page.tsx
'use client';

import { useEffect, useState, useTransition } from 'react';
import { getVendors } from '@/lib/actions/vendor-discovery';

export default function FirmalarPage() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [vendors, setVendors] = useState<any[]>([]);

  // Filtre State'leri
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [city, setCity] = useState('ALL');

  const fetchVendors = () => {
    startTransition(async () => {
      const res = await getVendors({
        search,
        category,
        city,
      });

      if (res.success && res.data) {
        setVendors(res.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchVendors();
  }, [category, city]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVendors();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Düğün Firmaları & Tedarikçiler</h1>
        <p className="text-sm text-gray-500 mt-1">
          Hayalinizdeki düğün için en iyi mekan, fotoğrafçı ve organizasyon firmalarını keşfedin.
        </p>
      </div>

      {/* Arama ve Filtreleme Barları */}
      <div className="p-4 bg-white/80 backdrop-blur-md rounded-xl border shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Firma adı veya hizmet ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm col-span-1 md:col-span-2"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
          >
            <option value="ALL">Tüm Kategoriler</option>
            <option value="MEKAN">Düğün Mekanı</option>
            <option value="FOTOGRAF">Fotoğraf & Video</option>
            <option value="ORGANIZASYON">Organizasyon</option>
            <option value="MUZIK">Müzik & Orkestra</option>
          </select>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
          >
            <option value="ALL">Tüm Şehirler</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="İzmir">İzmir</option>
            <option value="Bursa">Bursa</option>
          </select>
        </form>
      </div>

      {/* Firma Kartları Listesi */}
      {loading || isPending ? (
        <div className="p-12 text-center text-gray-500">Firmalar aranıyor...</div>
      ) : vendors.length === 0 ? (
        <div className="p-12 text-center bg-white/50 rounded-xl border text-gray-500">
          Aramanıza uygun firma bulunamadı.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="p-5 bg-white/80 backdrop-blur-md rounded-xl border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-800">{vendor.name}</h3>
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded font-medium">
                    {vendor.category || 'Genel'}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{vendor.city || 'Şehir Belirtilmedi'}</p>
                <p className="text-sm text-gray-600 line-clamp-3">{vendor.description || 'Açıklama bulunmuyor.'}</p>
              </div>

              <div className="mt-4 pt-3 border-t flex justify-between items-center">
                <span className="text-sm font-semibold text-emerald-600">
                  {vendor.startingPrice ? `${vendor.startingPrice.toLocaleString('tr-TR')} ₺'den başlayan` : 'Fiyat Teklifi Alın'}
                </span>
                <a
                  href={`/firma/${vendor.id}`}
                  className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700"
                >
                  Incele
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}