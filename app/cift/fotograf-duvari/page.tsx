// app/cift/fotograf-duvari/page.tsx
'use client';

import { useEffect, useState, useTransition } from 'react';
import {
  getPhotoWallItems,
  createPhotoWallItem,
  deletePhotoWallItem,
} from '@/lib/actions/photo-wall';

export default function PhotoWallPage() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [photos, setPhotos] = useState<any[]>([]);

  // Form State
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [uploaderName, setUploaderName] = useState('');

  const loadPhotos = async () => {
    setLoading(true);
    const res = await getPhotoWallItems();
    if (res.success && res.data) {
      setPhotos(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    startTransition(async () => {
      const res = await createPhotoWallItem({
        url: imageUrl,
        caption,
        uploaderName: uploaderName || 'Çift',
      });

      if (res.success) {
        setImageUrl('');
        setCaption('');
        setUploaderName('');
        await loadPhotos();
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deletePhotoWallItem(id);
      if (res.success) {
        await loadPhotos();
      }
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Fotoğraf duvarı yükleniyor...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Düğün Fotoğraf Duvarı</h1>
        <p className="text-sm text-gray-500 mt-1">
          Düğün gününüzden ve hazırlık sürecinizden anıları paylaşın, anı duvarınızı oluşturun.
        </p>
      </div>

      {/* Fotoğraf Yükleme Formu */}
      <form onSubmit={handleAddPhoto} className="p-5 bg-white/80 backdrop-blur-md rounded-2xl border shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Fotoğraf Ekle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="url"
            placeholder="Fotoğraf Bağlantısı (URL) *"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="px-3.5 py-2.5 border rounded-xl w-full text-sm focus:outline-none focus:border-indigo-500"
            required
          />
          <input
            type="text"
            placeholder="Açıklama / Not (örn. İlk Dans)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="px-3.5 py-2.5 border rounded-xl w-full text-sm focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Paylaşan (örn. Gelin, Damat, Ahmet Bey)"
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            className="px-3.5 py-2.5 border rounded-xl w-full text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={isPending || !imageUrl.trim()}
          className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
        >
          {isPending ? 'Fotoğraf Yükleniyor...' : 'Duvara Ekle'}
        </button>
      </form>

      {/* Galeri Izgarası (Grid) */}
      {photos.length === 0 ? (
        <div className="p-12 text-center bg-white/50 backdrop-blur-md rounded-2xl border text-gray-500">
          Fotoğraf duvarında henüz hiç görsel yok. İlk fotoğrafı yukarıdaki formdan yükleyebilirsiniz!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative bg-white/80 backdrop-blur-md rounded-2xl border shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.caption || 'Düğün Fotoğrafı'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=60';
                  }}
                />
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <p className="font-semibold text-gray-800 text-sm line-clamp-2">
                    {photo.caption || 'Açıklama yok'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Paylaşan: <span className="font-medium text-gray-600">{photo.uploaderName || 'Çift'}</span>
                  </p>
                </div>

                <div className="pt-2 border-t flex justify-between items-center text-xs text-gray-400">
                  <span>
                    {photo.createdAt
                      ? new Date(photo.createdAt).toLocaleDateString('tr-TR')
                      : 'Yeni'}
                  </span>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    disabled={isPending}
                    className="text-red-500 hover:text-red-700 font-medium text-xs disabled:opacity-50"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}