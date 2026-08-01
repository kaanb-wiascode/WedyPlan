'use client';

import React, { useEffect, useState, useTransition } from 'react';
import {
  getPhotoWallItems,
  createPhotoWallItem,
  deletePhotoWallItem,
} from '@/lib/actions/photo-wall';
import { Camera, Plus, Trash2, Image as ImageIcon, Sparkles, User, Calendar } from 'lucide-react';

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
    if (!confirm('Bu fotoğrafı duvardan silmek istediğinize emin misiniz?')) return;
    startTransition(async () => {
      const res = await deletePhotoWallItem(id);
      if (res.success) {
        await loadPhotos();
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3 font-sans">
        <div className="w-6 h-6 border-2 border-zinc-900 dark:border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-zinc-500">Fotoğraf Duvarı Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased">
      
      {/* HEADER (Frosted Glass) */}
      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
          <Camera className="w-3.5 h-3.5 text-zinc-500" />
          <span>Anı Duvarı</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Düğün Fotoğraf Duvarı
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Düğün gününüzden ve hazırlık sürecinizden anıları paylaşın, özel anı galerinizi oluşturun.
        </p>
      </div>

      {/* Fotoğraf Yükleme Formu (Frosted Glass) */}
      <form onSubmit={handleAddPhoto} className="p-6 sm:p-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-zinc-500" /> Fotoğraf Ekle
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Görsel Bağlantısı (URL) *</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium w-full"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Açıklama / Not</label>
            <input
              type="text"
              placeholder="örn. İlk Dans Anımız"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium w-full"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Paylaşan İsim</label>
            <input
              type="text"
              placeholder="örn. Selin & Kaan"
              value={uploaderName}
              onChange={(e) => setUploaderName(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium w-full"
            />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending || !imageUrl.trim()}
            className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold rounded-xl hover:bg-black dark:hover:bg-zinc-200 disabled:opacity-50 transition-all cursor-pointer shadow-xs"
          >
            {isPending ? 'Fotoğraf Yükleniyor...' : 'Duvara Ekle'}
          </button>
        </div>
      </form>

      {/* Galeri Izgarası (Grid) */}
      {photos.length === 0 ? (
        <div className="p-12 text-center bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-400 text-xs font-medium">
          Fotoğraf duvarında henüz hiç görsel yok. İlk fotoğrafı yukarıdaki formdan yükleyebilirsiniz!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.caption || 'Düğün Fotoğrafı'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=60';
                  }}
                />
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white text-xs line-clamp-2">
                    {photo.caption || 'Açıklama yok'}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1 font-medium">
                    <User className="w-3 h-3 text-zinc-400" />
                    <span>{photo.uploaderName || 'Çift'}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex justify-between items-center text-[10px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {photo.createdAt
                      ? new Date(photo.createdAt).toLocaleDateString('tr-TR')
                      : 'Yeni'}
                  </span>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    disabled={isPending}
                    className="p-1 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50"
                    title="Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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