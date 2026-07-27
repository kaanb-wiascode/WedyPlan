'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footerButtons?: React.ReactNode;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footerButtons
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-3xl border border-white/80 dark:border-zinc-800/80 w-full max-w-lg rounded-[36px] shadow-2xl p-6 sm:p-8 space-y-6 relative"
        >
          <div className="flex items-center justify-between border-b border-black/5 dark:border-zinc-800 pb-4">
            <h3 className="font-serif font-bold text-[22px] text-[#1D1D1F] dark:text-white">{title}</h3>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>{children}</div>

          {footerButtons && (
            <div className="pt-4 border-t border-black/5 dark:border-zinc-800 flex items-center justify-end gap-3">
              {footerButtons}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};