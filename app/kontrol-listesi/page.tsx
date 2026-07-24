'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  period: string;
  completed: boolean;
}

const DEFAULT_TASKS: Task[] = [
  // 12-6 Ay Önce
  { id: '1', title: 'Düğün bütçesini ve tahmini davetli sayısını belirle', period: '12-6 Ay Önce', completed: false },
  { id: '2', title: 'Hayalindeki düğün mekanını seç ve rezervasyon yaptır', period: '12-6 Ay Önce', completed: false },
  { id: '3', title: 'Düğün konseptini ve renk paletini kararlaştır', period: '12-6 Ay Önce', completed: false },

  // 6-3 Ay Önce
  { id: '4', title: 'Düğün fotoğrafçısı ve videograferi ile anlaş', period: '6-3 Ay Önce', completed: false },
  { id: '5', title: 'Gelinlik ve damatlık modellerini seç ve sipariş ver', period: '6-3 Ay Önce', completed: false },
  { id: '6', title: 'Müzik ekibi, DJ veya orkestrayı belirle', period: '6-3 Ay Önce', completed: false },
  { id: '7', title: 'Organizasyon ve süsleme firmasını seç', period: '6-3 Ay Önce', completed: false },

  // 3-1 Ay Önce
  { id: '8', title: 'Davetiye tasarımını seç, bastır ve dağıtmaya başla', period: '3-1 Ay Önce', completed: false },
  { id: '9', title: 'Nikah hediyelikleri ve şekerlerini sipariş et', period: '3-1 Ay Önce', completed: false },
  { id: '10', title: 'Gelin saç ve makyaj provası için randevu al', period: '3-1 Ay Önce', completed: false },

  // Son Haftalar
  { id: '11', title: 'Davetli katılımlarını (LCV) teyit et ve masa düzenini yap', period: 'Son Haftalar', completed: false },
  { id: '12', title: 'Son gelinlik ve damatlık provasını gerçekleştir', period: 'Son Haftalar', completed: false },
  { id: '13', title: 'Düğün günü akış planını tüm firmalarla paylaş', period: 'Son Haftalar', completed: false },

  // Düğün Günü
  { id: '14', title: 'Rahat bir yedek ayakkabı ve acil durum çantasını hazırla', period: 'Düğün Günü', completed: false },
  { id: '15', title: 'Derin bir nefes al ve bu özel günün tadını çıkar! 💍', period: 'Düğün Günü', completed: false },
];

const PERIODS = ['Tüm Adımlar', '12-6 Ay Önce', '6-3 Ay Önce', '3-1 Ay Önce', 'Son Haftalar', 'Düğün Günü'];

export default function ChecklistPage() {
  const [weddingDate, setWeddingDate] = useState<string>('2026-09-15');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Tüm Adımlar');
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskPeriod, setNewTaskPeriod] = useState<string>('6-3 Ay Önce');
  const [isLoaded, setIsLoaded] = useState(false);

  // LocalStorage'dan yükle
  useEffect(() => {
    try {
      const savedDate = localStorage.getItem('wedy_wedding_date');
      const savedTasks = localStorage.getItem('wedy_checklist_tasks');
      if (savedDate) setWeddingDate(savedDate);
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } catch (e) {
      console.error('Veri yükleme hatası:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // LocalStorage'a kaydet
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('wedy_wedding_date', weddingDate);
      localStorage.setItem('wedy_checklist_tasks', JSON.stringify(tasks));
    }
  }, [weddingDate, tasks, isLoaded]);

  // Canlı Geri Sayım Hesaplayıcı
  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(weddingDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const setDays = (d: number) => setTimeLeft((prev) => ({ ...prev, days: d }));
    const setHours = (h: number) => setTimeLeft((prev) => ({ ...prev, hours: h }));
    const setMinutes = (m: number) => setTimeLeft((prev) => ({ ...prev, minutes: m }));
    const setSeconds = (s: number) => setTimeLeft((prev) => ({ ...prev, seconds: s }));

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  // Görev tamamlama
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  // Yeni görev ekleme
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      period: newTaskPeriod,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle('');
  };

  // Görev silme
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // İlerleme Oranı
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Filtrelenmiş görevler
  const filteredTasks = selectedPeriod === 'Tüm Adımlar'
    ? tasks
    : tasks.filter((t) => t.period === selectedPeriod);

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/butce-hesaplayici"
            className="text-xs font-bold text-[#E6007E] bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-full transition"
          >
            💍 Bütçe Hesaplayıcı
          </Link>
          <Link href="/" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E]">
            ← Ana Sayfa
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Başlık */}
        <div className="text-center space-y-2">
          <span className="bg-purple-100 text-[#4A154B] text-xs font-bold px-3 py-1 rounded-full uppercase">
            Planlama Asistanı
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#4A154B]">
            Düğün Sayacı & Kontrol Listesi ⏳
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Düğün tarihinizi girin, geri sayımı başlatın ve adım adım tüm hazırlıklarınızı eksiksiz tamamlayın.
          </p>
        </div>

        {/* Geri Sayım Kartı */}
        <div className="bg-gradient-to-br from-[#4A154B] to-purple-900 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
            <span className="text-sm font-semibold text-purple-200">✨ Büyük Güne Kalan Zaman:</span>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/20">
              <span className="text-xs text-purple-200 font-bold">Düğün Tarihiniz:</span>
              <input
                type="date"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Canlı Sayaç Blokları */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-md p-3 md:p-5 rounded-2xl border border-white/10">
              <span className="block text-2xl md:text-5xl font-extrabold text-[#E6007E]">
                {timeLeft.days}
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-purple-200 uppercase">Gün</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 md:p-5 rounded-2xl border border-white/10">
              <span className="block text-2xl md:text-5xl font-extrabold text-white">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-purple-200 uppercase">Saat</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 md:p-5 rounded-2xl border border-white/10">
              <span className="block text-2xl md:text-5xl font-extrabold text-white">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-purple-200 uppercase">Dakika</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 md:p-5 rounded-2xl border border-white/10">
              <span className="block text-2xl md:text-5xl font-extrabold text-pink-300">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-purple-200 uppercase">Saniye</span>
            </div>
          </div>
        </div>

        {/* İlerleme Çubuğu */}
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-[#4A154B]">Hazırlık Tamamlanma Oranı ({completedCount}/{tasks.length})</span>
            <span className="text-[#E6007E]">%{progressPercentage}</span>
          </div>
          <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-[#E6007E] transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Dönem Filtre Butonları */}
        <div className="flex flex-wrap gap-2">
          {PERIODS.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                selectedPeriod === period
                  ? 'bg-[#4A154B] text-white shadow'
                  : 'bg-white text-slate-600 border border-purple-100 hover:bg-purple-50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Yeni Adım Ekle Formu */}
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              placeholder="Yeni yapılacak görev ekleyin (Örn: Gelin buketi siparişi)"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-grow p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            />
            <select
              value={newTaskPeriod}
              onChange={(e) => setNewTaskPeriod(e.target.value)}
              className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] bg-white"
            >
              <option value="12-6 Ay Önce">12-6 Ay Önce</option>
              <option value="6-3 Ay Önce">6-3 Ay Önce</option>
              <option value="3-1 Ay Önce">3-1 Ay Önce</option>
              <option value="Son Haftalar">Son Haftalar</option>
              <option value="Düğün Günü">Düğün Günü</option>
            </select>
            <button
              type="submit"
              className="bg-[#E6007E] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-pink-700 transition"
            >
              + Ekle
            </button>
          </form>
        </div>

        {/* Görev Listesi */}
        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <span className="text-xs font-bold text-[#4A154B]">{selectedPeriod} Listesi</span>
            <span className="text-[11px] text-slate-400">İşaretlemek için kutucuğa tıklayın</span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredTasks.length === 0 ? (
              <p className="p-6 text-center text-xs text-slate-400">Bu dönem için kayıtlı adım bulunmuyor.</p>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 flex items-center justify-between gap-4 transition hover:bg-purple-50/20 ${
                    task.completed ? 'bg-slate-50/60' : ''
                  }`}
                >
                  <label className="flex items-center gap-3 cursor-pointer flex-grow">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4 accent-[#E6007E] rounded cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold bg-purple-100 text-[#4A154B] px-2 py-0.5 rounded">
                        {task.period}
                      </span>
                      <p
                        className={`text-xs font-semibold ${
                          task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {task.title}
                      </p>
                    </div>
                  </label>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-slate-300 hover:text-red-500 font-bold text-sm px-2"
                    title="Görevi Sil"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}