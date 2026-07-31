// app/firma/takvim/page.tsx
'use client';

import { useEffect, useState, useTransition } from 'react';
import {
  getVendorEvents,
  createVendorEvent,
  deleteVendorEvent,
} from '@/lib/actions/vendor-calendar';

export default function TakvimPage() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [events, setEvents] = useState<any[]>([]);
  const [conflictNotice, setConflictNotice] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('Düğün');
  const [notes, setNotes] = useState('');

  const loadEvents = async () => {
    setLoading(true);
    const res = await getVendorEvents();
    if (res.success && res.data) {
      setEvents(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !eventDate) return;

    setConflictNotice(false);

    startTransition(async () => {
      const res = await createVendorEvent({
        title,
        clientName,
        eventDate,
        eventType,
        notes,
      });

      if (res.success) {
        if (res.hasConflict) {
          setConflictNotice(true);
        }
        setTitle('');
        setClientName('');
        setEventDate('');
        setNotes('');
        await loadEvents();
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteVendorEvent(id);
      if (res.success) {
        await loadEvents();
      }
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Takvim yükleniyor...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Takvim & Müsaitlik Yönetimi</h1>
        <p className="text-sm text-gray-500 mt-1">
          Düğün rezervasyonlarınızı, toplantılarınızı ve dolu günlerinizi yönetin.
        </p>
      </div>

      {conflictNotice && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex items-center justify-between">
          <span>
            ⚠️ <strong>Çakışma Uyarısı:</strong> Seçtiğiniz tarihte önceden eklenmiş başka bir etkinlik mevcut!
          </span>
          <button
            onClick={() => setConflictNotice(false)}
            className="text-xs font-semibold underline text-amber-900"
          >
            Kapat
          </button>
        </div>
      )}

      {/* Yeni Etkinlik / Rezervasyon Formu */}
      <form onSubmit={handleAddEvent} className="p-5 bg-white/80 backdrop-blur-md rounded-xl border shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Yeni Randevu / Rezervasyon Ekle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Etkinlik / Organizasyon Adı *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
            required
          />
          <input
            type="text"
            placeholder="Müşteri / Çift Adı"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
          />
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
            required
          />
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
          >
            <option value="Düğün">Düğün Organizasyonu</option>
            <option value="Nişan">Nişan / Kına</option>
            <option value="Cekim">Dış Çekim / Fotoğraf</option>
            <option value="Gorusme">Müşteri Görüşmesi</option>
          </select>
          <input
            type="text"
            placeholder="Notlar (Opsiyonel)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm md:col-span-2"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending ? 'Kaydediliyor...' : 'Takvime İşle'}
        </button>
      </form>

      {/* Ajanda / Etkinlik Listesi */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-700 text-sm">Planlanan Etkinlikler & Randevular</h3>
          <span className="text-xs text-gray-500">{events.length} Kayıt</span>
        </div>
        <div className="divide-y text-sm">
          {events.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Takviminizde henüz kayıtlı bir etkinlik bulunmuyor.
            </div>
          ) : (
            events.map((evt) => (
              <div
                key={evt.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-800">{evt.title}</span>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded font-medium">
                      {evt.eventType || 'Organizasyon'}
                    </span>
                    {evt.status === 'WARNING_CONFLICT' && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded font-medium">
                        Çakışma Var
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 space-x-3">
                    <span>👤 Müşteri: {evt.clientName || 'Belirtilmedi'}</span>
                    {evt.notes && <span>• 📝 {evt.notes}</span>}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg border">
                    🗓️ {new Date(evt.eventDate).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <button
                    onClick={() => handleDelete(evt.id)}
                    disabled={isPending}
                    className="text-red-500 hover:text-red-700 text-xs font-medium disabled:opacity-50"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}