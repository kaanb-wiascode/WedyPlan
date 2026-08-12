"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RoleGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetch("/api/v1/auth/verify")
      .then((res) => res.json())
      .then((data) => {
        if (data?.authenticated) {
          setAuthorized(true);
        } else {
          router.replace("/giris");
        }
      })
      .catch(() => router.replace("/giris"));
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center space-y-3 text-white">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-zinc-400">Oturum Doğrulanıyor...</p>
      </div>
    );
  }

  return <>{children}</>;
}
