'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserRole = 'ADMIN' | 'VENDOR' | 'COUPLE' | null;

interface AuthContextType {
  user: any;
  role: UserRole;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<UserRole>('COUPLE');
  const [loading, setLoading] = useState(false); // Otomatik oturum atmaması için false

  const logout = async () => {
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    localStorage.clear();
    window.location.href = '/giris';
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);