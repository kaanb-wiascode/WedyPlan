"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CountdownWidget({ weddingDate, location }: { weddingDate: string; location: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(weddingDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="h-full backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-amber-500/10 dark:from-rose-950/20 dark:via-slate-900/80 dark:to-stone-900/20 border border-white/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Büyük Güne Kalan Süre
          </span>
          <p className="text-sm text-slate-500 mt-0.5">{location}</p>
        </div>
        <span className="text-2xl">💍</span>
      </div>

      <div className="grid grid-cols-4 gap-2 my-4 text-center">
        {[
          { label: "Gün", value: timeLeft.days },
          { label: "Saat", value: timeLeft.hours },
          { label: "Dakika", value: timeLeft.minutes },
          { label: "Saniye", value: timeLeft.seconds },
        ].map((item, i) => (
          <div key={i} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-3 border border-white/40 dark:border-slate-700/50">
            <span className="block text-2xl md:text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase font-medium text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="text-xs text-slate-500 text-right font-medium">
        Tarih: {new Date(weddingDate).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
      </div>
    </motion.div>
  );
}