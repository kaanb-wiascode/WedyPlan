'use client';

import React from 'react';
import { UserRole } from '@/types/auth';
import { Heart, Store } from 'lucide-react';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onChangeRole: (role: UserRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onChangeRole }) => {
  return (
    <div className="p-1 bg-[#1D1D1F]/5 rounded-2xl grid grid-cols-2 gap-1 text-[12px] font-bold">
      <button
        type="button"
        onClick={() => onChangeRole('COUPLE')}
        className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
          selectedRole === 'COUPLE'
            ? 'bg-white text-[#1D1D1F] shadow-xs'
            : 'text-[#6E6E73] hover:text-[#1D1D1F]'
        }`}
      >
        <Heart className={`w-3.5 h-3.5 ${selectedRole === 'COUPLE' ? 'fill-[#0071e3] text-[#0071e3]' : ''}`} />
        <span>Evlenecek Çiftim</span>
      </button>

      <button
        type="button"
        onClick={() => onChangeRole('VENDOR')}
        className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
          selectedRole === 'VENDOR'
            ? 'bg-[#1D1D1F] text-white shadow-xs'
            : 'text-[#6E6E73] hover:text-[#1D1D1F]'
        }`}
      >
        <Store className={`w-3.5 h-3.5 ${selectedRole === 'VENDOR' ? 'text-[#D4AF37]' : ''}`} />
        <span>Düğün Firmasıyım</span>
      </button>
    </div>
  );
};