'use client';

import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DropdownMenuItem } from '@/types/enterprise-components';
import { Icon } from '@/components/shared/ui/Icon';

interface DropdownMenuProps {
  items: DropdownMenuItem[];
  triggerIcon?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, triggerIcon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 transition cursor-pointer"
      >
        {triggerIcon ? <Icon name={triggerIcon as any} size={18} /> : <MoreVertical className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            className="absolute right-0 mt-2 w-48 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl p-1.5 z-50 space-y-1"
          >
            {items.map((item) => {
              if (item.isDivider) {
                return <div key={item.id} className="border-t border-black/5 dark:border-zinc-800 my-1" />;
              }

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-bold transition cursor-pointer ${
                    item.isDanger
                      ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                      : 'text-[#1D1D1F] dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {item.iconName && <Icon name={item.iconName as any} size={14} />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};