'use client';

import React, { createContext, useContext, useState, useRef } from 'react';

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

type ConfirmContextType = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = (opts: ConfirmOptions): Promise<boolean> => {
    setOptions({
      confirmText: 'Evet, Sil',
      cancelText: 'Vazgeç',
      variant: 'danger',
      ...opts,
    });

    return new Promise((resolve) => {
      resolverRef.current = resolve;
    });
  };

  const handleConfirm = () => {
    if (resolverRef.current) resolverRef.current(true);
    setOptions(null);
  };

  const handleCancel = () => {
    if (resolverRef.current) resolverRef.current(false);
    setOptions(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      {/* 🍏 APPLE STANDARTINDA GLOBAL LOGOLU BUZLU CAM MODAL */}
      {options && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200 font-sans antialiased">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-3xl p-6 sm:p-7 max-w-sm w-full text-center space-y-5 animate-in zoom-in-95 duration-200">
            
            {/* Orijinal WedyPlan İkonu */}
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/60 flex items-center justify-center mx-auto shadow-xs">
              <img
                src="/assets/branding/logo-icon.svg"
                alt="WedyPlan"
                className="w-6 h-6 object-contain"
              />
            </div>

            {/* Başlık ve Mesaj */}
            <div className="space-y-1.5">
              <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">
                {options.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
                {options.message}
              </p>
            </div>

            {/* Apple Tarzı Çift Buton */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer"
              >
                {options.cancelText}
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  options.variant === 'danger'
                    ? 'bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-600 dark:text-red-400'
                    : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black'
                }`}
              >
                {options.confirmText}
              </button>
            </div>

          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm hooku ConfirmProvider içinde kullanılmalıdır.');
  }
  return context;
}