"use client";

import React from "react";
import { motion } from "framer-motion";

export default function IntegrationCardGrid({
  services,
  onToggleConnection,
}: {
  services: any[];
  onToggleConnection: (id: string, currentConnected: boolean) => void;
}) {
  return (
    <div className="space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🔌 Entegrasyon Servis Kataloğu ({services.length} Servis)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {services.map((srv) => (
          <motion.div
            key={srv.id}
            whileHover={{ y: -2 }}
            className={"p-5 rounded-3xl border backdrop-blur-2xl transition space-y-3 flex flex-col justify-between " +
              (srv.isConnected
                ? "bg-white/80 dark:bg-slate-900/80 border-emerald-200/60 dark:border-emerald-900/40 shadow-sm"
                : "bg-white/40 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800")
            }
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{srv.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{srv.name}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">{srv.category}</span>
                  </div>
                </div>

                <span
                  className={"w-2.5 h-2.5 rounded-full " +
                    (srv.isConnected ? "bg-emerald-500 animate-pulse" : "bg-slate-300 dark:bg-slate-700")
                  }
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">{srv.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-mono">
                {srv.isConnected ? "● " + (srv.lastSync || "Senkronize") : "Bağlı Değil"}
              </span>

              <button
                onClick={() => onToggleConnection(srv.id, srv.isConnected)}
                className={"px-3 py-1.5 rounded-xl font-bold text-[10px] transition " +
                  (srv.isConnected
                    ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300 hover:bg-rose-100"
                    : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90")
                }
              >
                {srv.isConnected ? "Bağlantıyı Kes" : "Bağlan →"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
