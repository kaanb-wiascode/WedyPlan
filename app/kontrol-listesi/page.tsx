'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Plus, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

// --- Mock Data ---
const INITIAL_TASKS = [
  { id: '1', title: 'Düğün bütçesini ve maksimum harcama limitini belirleyin.', category: '12-9 Ay Kala', completed: true },
  { id: '2', title: 'Taslak davetli listesini oluşturun.', category: '12-9 Ay Kala', completed: true },
  { id: '3', title: 'Hayalinizdeki düğün mekanlarını araştırın ve teklif alın.', category: '12-9 Ay Kala', completed: false },
  { id: '4', title: 'Fotoğraf ve video sanatçısı ile anlaşıp tarihi rezerve edin.', category: '9-6 Ay Kala', completed: false },
  { id: '5', title: 'Gelinlik / Damatlık araştırmalarına başlayın.', category: '9-6 Ay Kala', completed: false },
  { id: '6', title: 'Balayı destinasyonunu seçip uçak/otel rezervasyonunu yapın.', category: '6-3 Ay Kala', completed: false },
  { id: '7', title: 'Nikah tarihi için belediyeye resmi başvuruda bulunun.', category: '6-3 Ay Kala', completed: false },
  { id: '8', title: 'Dijital davetiyenizi tasarlayın ve sevdiklerinize gönderin.', category: '3-1 Ay Kala', completed: false },
];

export default function PremiumChecklistPage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // İlerleme Hesaplaması
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  // Kategoriye Göre Gruplama
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white pb-32">
      
      {/* Premium Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1000px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="text-[22px] font-medium tracking-tight">
            WedyPlan.
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium">
            <Link href="/arama" className="text-[#666666] hover:text-[#111111] transition-colors">Keşfet</Link>
            <Link href="/kontrol-listesi" className="text-[#7C5CFF]">Planlama</Link>
            <Link href="/hediye-listesi" className="text-[#666666] hover:text-[#111111] transition-colors">Kayıtlar</Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F8F8F7] rounded-full text-[13px] font-medium text-[#111111]">
              <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-pulse"></div>
              <span>Selin & Caner</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto px-6 pt-16">
        
        {/* Header & Countdown (Apple Editorial Style) */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F8F7] text-[13px] font-medium text-[#666666] mb-6">
            <Calendar className="w-3.5 h-3.5" />
            <span>15 Eylül 2026</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-[48px] md:text-[56px] font-medium tracking-tight leading-[1.05] mb-4">
                Büyük güne <br/>
                <span className="text-[#7C5CFF]">234 gün</span> kaldı.
              </h1>
              <p className="text-[18px] text-[#666666] max-w-[500px]">
                Her şey kontrol altında. Adım adım ilerleyerek stresten uzak bir planlama süreci yaşayın.
              </p>
            </div>

            {/* Smart Progress Widget */}
            <div className="w-full md:w-[320px] bg-[#F8F8F7] p-6 rounded-[24px] border border-[rgba(0,0,0,0.04)] shrink-0">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-[15px] font-medium text-[#111111]">Genel İlerleme</span>
                <span className="text-[24px] font-medium tracking-tight text-[#7C5CFF]">%{progressPercent}</span>
              </div>
              {/* Very thin, elegant progress bar */}
              <div className="w-full h-[4px] bg-[rgba(0,0,0,0.06)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#7C5CFF] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="text-[13px] text-[#999999] mt-3">
                {totalTasks} görevden {completedTasks} tanesi tamamlandı.
              </p>
            </div>
          </div>
        </header>

        {/* Dynamic Checklist Layout */}
        <div className="space-y-16">
          {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
            <section key={category}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6 sticky top-[72px] bg-white/90 backdrop-blur-md py-4 z-10 border-b border-[rgba(0,0,0,0.04)]">
                <h2 className="text-[22px] font-medium tracking-tight text-[#111111]">
                  {category}
                </h2>
                <span className="px-2 py-0.5 rounded-[6px] bg-[#F8F8F7] text-[12px] font-medium text-[#666666]">
                  {categoryTasks.filter(t => t.completed).length} / {categoryTasks.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="space-y-2">
                {categoryTasks.map((task) => (
                  <div 
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="group flex items-start gap-4 p-4 rounded-[18px] hover:bg-[#F8F8F7] transition-colors cursor-pointer"
                  >
                    <button className="shrink-0 mt-0.5 focus:outline-none transition-transform duration-200 active:scale-90">
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-[#7C5CFF] transition-colors" strokeWidth={1.5} />
                      ) : (
                        <Circle className="w-6 h-6 text-[#CCCCCC] group-hover:text-[#999999] transition-colors" strokeWidth={1.5} />
                      )}
                    </button>
                    <span 
                      className={`text-[16px] leading-relaxed transition-all duration-300 ${
                        task.completed 
                          ? 'text-[#999999] line-through decoration-[rgba(0,0,0,0.1)]' 
                          : 'text-[#111111]'
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Action Bottom Bar */}
        <div className="mt-16 p-8 bg-[#F8F8F7] rounded-[28px] border border-[rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <Sparkles className="w-5 h-5 text-[#7C5CFF]" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-[16px] font-medium text-[#111111]">Özel Görev Ekle</h3>
              <p className="text-[14px] text-[#666666]">İhtiyacınıza göre kendi maddelerinizi listeye dahil edin.</p>
            </div>
          </div>
          
          <button className="w-full md:w-auto h-[52px] px-6 bg-white border border-[rgba(0,0,0,0.08)] hover:bg-[#F0F0EF] text-[#111111] rounded-[18px] text-[15px] font-medium flex items-center justify-center gap-2 transition-colors duration-300 shadow-sm">
            <Plus className="w-4 h-4" /> Yeni Görev
          </button>
        </div>

      </main>
    </div>
  );
}