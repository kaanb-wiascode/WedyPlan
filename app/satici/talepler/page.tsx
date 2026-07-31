// app/satici/talepler/page.tsx
'use client';

import { useEffect, useState, useTransition } from 'react';
import { getVendorRequests, updateRequestStatus } from '@/lib/actions/offer-request';

export default function TaleplerPage() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [requests, setRequests] = useState<any[]>([]);

  const loadRequests = async () => {
    setLoading(true);
    const res = await getVendorRequests();
    if (res.success && res.data) {
      setRequests(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleStatusChange = (id: string, newStatus: string) => {
    startTransition(async () => {
      const res = await updateRequestStatus(id, newStatus);
      if (res.success) {
        await loadRequests();
      }
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Talepler yükleniyor...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Gelen Teklif Talepleri</h1>
        <p className="text-sm text-gray-500 mt-1">
          Çiftlerden gelen düğün teklif taleplerini inceleyin ve yanıtlayın.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b text-xs uppercase font-semibold text-gray-500">
              <th className="p-3">Çift / Müşteri</th>
              <th className="p-3">Düğün Tarihi</th>
              <th className="p-3">Tahmini Bütçe</th>
              <th className="p-3">Not / Mesaj</th>
              <th className="p-3">Durum</th>
              <th className="p-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  Henüz gelen bir teklif talebi bulunmuyor.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/50">
                  <td className="p-3 font-medium text-gray-800">
                    {req.customerName || req.coupleName || 'İsimsiz Çift'}
                  </td>
                  <td className="p-3 text-gray-500">
                    {req.eventDate ? new Date(req.eventDate).toLocaleDateString('tr-TR') : 'Belirtilmedi'}
                  </td>
                  <td className="p-3 font-semibold text-emerald-600">
                    {req.budget ? `${req.budget.toLocaleString('tr-TR')} ₺` : 'Belirtilmedi'}
                  </td>
                  <td className="p-3 text-gray-600 max-w-xs truncate">{req.message || req.notes || '-'}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-md font-medium ${
                        req.status === 'REPLIED'
                          ? 'bg-emerald-50 text-emerald-700'
                          : req.status === 'REJECTED'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {req.status === 'REPLIED'
                        ? 'Yanıtlandı'
                        : req.status === 'REJECTED'
                        ? 'Reddedildi'
                        : 'Bekliyor'}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleStatusChange(req.id, 'REPLIED')}
                      disabled={isPending}
                      className="px-2.5 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                      Yanıtla
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