// app/cift/gorevler/page.tsx
'use client';

import { useEffect, useState, useTransition } from 'react';
import {
  getChecklistTasks,
  createChecklistTask,
  toggleTaskStatus,
  deleteChecklistTask,
} from '@/lib/actions/checklist';

const DEMO_COUPLE_ID = 'demo-couple-123';

export default function ChecklistPage() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [taskData, setTaskData] = useState<{
    tasks: any[];
    stats: {
      total: number;
      completedCount: number;
      pendingCount: number;
      percentage: number;
    };
  }>({
    tasks: [],
    stats: { total: 0, completedCount: 0, pendingCount: 0, percentage: 0 },
  });

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Düğün Öncesi');
  const [dueDate, setDueDate] = useState('');

  const loadData = async () => {
    setLoading(true);
    const res = await getChecklistTasks(DEMO_COUPLE_ID);
    if (res.success && res.data) {
      setTaskData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    startTransition(async () => {
      const res = await createChecklistTask({
        coupleId: DEMO_COUPLE_ID,
        title,
        category,
        dueDate,
      });

      if (res.success) {
        setTitle('');
        setDueDate('');
        await loadData();
      }
    });
  };

  const handleToggle = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      const res = await toggleTaskStatus(id, !currentStatus);
      if (res.success) {
        await loadData();
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteChecklistTask(id);
      if (res.success) {
        await loadData();
      }
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Kontrol listesi yükleniyor...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Düğün Kontrol Listesi</h1>
        <p className="text-sm text-gray-500 mt-1">Düğün gününüze kadar yapılması gereken tüm görevleri planlayın ve takip edin.</p>
      </div>

      {/* İlerleme Çubuğu ve İstatistikler */}
      <div className="p-5 bg-white/80 backdrop-blur-md rounded-xl border shadow-sm space-y-3">
        <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
          <span>Tamamlanma Oranı (%{taskData.stats.percentage})</span>
          <span>{taskData.stats.completedCount} / {taskData.stats.total} Görev</span>
        </div>
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${taskData.stats.percentage}%` }}
          />
        </div>
      </div>

      {/* Yeni Görev Ekleme Formu */}
      <form onSubmit={handleAddTask} className="p-5 bg-white/80 rounded-xl border space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Yeni Görev Ekle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Görev Başlığı (örn. Nikah Şekeri Siparişi)"
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
            <option value="Düğün Öncesi">Düğün Öncesi (12-6 Ay)</option>
            <option value="Hazırlık">Son Hazırlıklar (6-1 Ay)</option>
            <option value="Son Hafta">Son Hafta</option>
            <option value="Düğün Günü">Düğün Günü</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending ? 'Ekleniyor...' : 'Görev Ekle'}
        </button>
      </form>

      {/* Görev Listesi */}
      <div className="bg-white/80 rounded-xl border overflow-hidden shadow-sm">
        <div className="divide-y">
          {taskData.tasks.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Henüz eklenmiş bir görev yok.
            </div>
          ) : (
            taskData.tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 flex items-center justify-between transition-colors hover:bg-gray-50/50 ${
                  task.completed ? 'bg-gray-50/70' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={!!task.completed}
                    onChange={() => handleToggle(task.id, task.completed)}
                    disabled={isPending}
                    className="w-5 h-5 text-indigo-600 rounded cursor-pointer"
                  />
                  <div>
                    <p
                      className={`font-medium text-sm ${
                        task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex space-x-2 text-xs text-gray-400 mt-0.5">
                      <span>{task.category || 'Genel'}</span>
                      {task.dueDate && (
                        <span>• Son Tarih: {new Date(task.dueDate).toLocaleDateString('tr-TR')}</span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  disabled={isPending}
                  className="text-red-500 hover:text-red-700 text-xs font-medium disabled:opacity-50"
                >
                  Sil
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}