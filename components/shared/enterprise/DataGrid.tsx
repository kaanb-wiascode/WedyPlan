'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { DataGridProps } from '@/types/enterprise-components';

export function DataGrid<T extends { id: string }>({
  columns,
  data,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  pageSize = 5,
  isLoading = false,
  emptyMessage = 'Gösterilecek veri bulunamadı.'
}: DataGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedState, setSelectedState] = useState<string[]>(selectedIds);

  const totalPages = Math.ceil(data.length / pageSize) || 1;
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSelectAll = () => {
    if (selectedState.length === paginatedData.length) {
      setSelectedState([]);
      onSelectionChange?.([]);
    } else {
      const allIds = paginatedData.map((d) => d.id);
      setSelectedState(allIds);
      onSelectionChange?.(allIds);
    }
  };

  const toggleSelectRow = (id: string) => {
    const updated = selectedState.includes(id)
      ? selectedState.filter((s) => s !== id)
      : [...selectedState, id];
    setSelectedState(updated);
    onSelectionChange?.(updated);
  };

  return (
    <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/80 dark:border-zinc-800/80 rounded-[32px] overflow-hidden shadow-xs space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black/5 dark:border-zinc-800 text-[11px] font-bold text-[#86868B] dark:text-zinc-400 uppercase tracking-wider bg-black/2 dark:bg-white/5">
              {selectable && (
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedState.length > 0 && selectedState.length === paginatedData.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 accent-[#E6007E] rounded cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th key={String(col.key)} className="p-4 font-bold" style={{ width: col.width }}>
                  <div className="flex items-center gap-1">
                    <span>{col.header}</span>
                    {col.sortable && <ArrowUpDown className="w-3 h-3 text-slate-400 cursor-pointer" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-black/5 dark:divide-zinc-800 text-[13px] font-medium text-[#1D1D1F] dark:text-zinc-200">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-8 text-center text-slate-400 animate-pulse">
                  Veriler yükleniyor...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-8 text-center text-[#86868B]">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => {
                const isSelected = selectedState.includes(row.id);

                return (
                  <tr
                    key={row.id}
                    className={`transition hover:bg-black/5 dark:hover:bg-white/5 ${
                      isSelected ? 'bg-pink-500/5 dark:bg-pink-950/20' : ''
                    }`}
                  >
                    {selectable && (
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(row.id)}
                          className="w-4 h-4 accent-[#E6007E] rounded cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={String(col.key)} className="p-4">
                        {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-black/5 dark:border-zinc-800 flex items-center justify-between text-[12px] font-bold text-[#86868B] dark:text-zinc-400">
        <span>Toplam {data.length} Kayıt ({currentPage} / {totalPages} Sayfa)</span>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-2 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-2 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}