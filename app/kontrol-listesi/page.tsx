'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWeddingOS } from '@/store/useWeddingOS'; // SİSTEM BEYNİ
import { CheckCircle2, Circle, Calendar, Plus, Sparkles } from 'lucide-react';

const INITIAL_TASKS = [
  { id: '1', title: 'Düğün bütçesini ve maksimum harcama limitini belirleyin.', category: '12-9 Ay Kala', completed: true },
  { id: '2', title: 'Taslak davetli listesini oluşturun.', category: '12-9 Ay Kala', completed: true },
  { id: '3', title: 'Hayalinizdeki düğün mekanını bulun ve resmi sözleşmeyi imzalayın.', category: '12-9 Ay Kala', completed: false },
  { id: '4', title: 'Fotoğraf ve video sanatçısı ile anlaşıp tarihi rezerve edin.', category: '9-6 Ay Kala', completed: false },
  { id: '5', title: 'Gelinlik / Damatlık araştırmalarına başlayın.', category: '9-6 Ay Kala', completed: false },
];

export default function PremiumChecklistPage() {
  const { venueDealStatus } = useWeddingOS(); // OS DURUMUNU DİNLİYORUZ
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  // OS OTOMASYONU: Eğer Mekan ile anlaşıldıysa (ONAYLANDI), Mekan bulma görevini OTOMATİK tamamla!
  useEffect(() => {
    if (venueDealStatus === 'ONAYLANDI') {
      setTasks(prev => prev.map(task => 
        task.id === '3' ? { ...task, completed: true, autoCompleted: true } : task
      ));
    }
  }, [venueDealStatus]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedTasks / tasks.length) * 100);

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white pb-32">
      
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1000px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="text-[22px] font-medium tracking-tight">WedyPlan.</Link>
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium">
            <Link href="/butce-hesaplayici" className="text-[#666666] hover:text-[#111111]">Bütçe</Link>
            <Link href="/kontrol-listesi" className="text-[#7C5CFF]">Planlama</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto px-6 pt-16">
        
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-[48px] md:text-[56px] font-medium tracking-tight leading-[1.05] mb-4">
              Planlama Akışı
            </h1>
            <p className="text-[18px] text-[#666666] max-w-[500px]">Stresten uzak, adım adım kusursuz bir düğün.</p>
          </div>
          
          <div className="w-full md:w-[320px] bg-[#F8F8F7] p-6 rounded-[24px] border border-[rgba(0,0,0,0.04)]">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-[15px] font-medium text-[#111111]">Genel İlerleme</span>
              <span className="text-[24px] font-medium tracking-tight text-[#7C5CFF]">%{progressPercent}</span>
            </div>
            <div className="w-full h-[4px] bg-[rgba(0,0,0,0.06)] rounded-full overflow-hidden">
              <div className="h-full bg-[#7C5CFF] rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </header>

        <div className="space-y-16">
          {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
            <section key={category}>
              <div className="flex items-center gap-4 mb-6 sticky top-[72px] bg-white/90 backdrop-blur-md py-4 z-10 border-b border-[rgba(0,0,0,0.04)]">
                <h2 className="text-[22px] font-medium tracking-tight text-[#111111]">{category}</h2>
              </div>

              <div className="space-y-2">
                {categoryTasks.map((task) => (
                  <div key={task.id} onClick={() => toggleTask(task.id)} className="group flex items-start justify-between gap-4 p-4 rounded-[18px] hover:bg-[#F8F8F7] transition-colors cursor-pointer">
                    <div className="flex items-start gap-4">
                      <button className="shrink-0 mt-0.5">
                        {task.completed ? <CheckCircle2 className="w-6 h-6 text-[#7C5CFF]" strokeWidth={1.5} /> : <Circle className="w-6 h-6 text-[#CCCCCC]" strokeWidth={1.5} />}
                      </button>
                      <span className={`text-[16px] leading-relaxed transition-all ${task.completed ? 'text-[#999999] line-through decoration-[rgba(0,0,0,0.1)]' : 'text-[#111111]'}`}>
                        {task.title}
                      </span>
                    </div>
                    
                    {/* OS OTOMASYONU ROZETİ */}
                    {task.autoCompleted && (
                      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#1DB954]/10 text-[#1DB954] rounded-full text-[12px] font-medium shrink-0">
                        <Sparkles className="w-3.5 h-3.5" /> OS Tarafından Tamamlandı
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}