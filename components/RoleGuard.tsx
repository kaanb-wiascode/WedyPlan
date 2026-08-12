"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWeddingOS } from "@/store/useWeddingOS";
import { dashboardPathForRole } from "@/lib/auth/redirects";
import { Lock } from "lucide-react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRole: "COUPLE" | "VENDOR" | "ADMIN";
}

export default function RoleGuard({ children, allowedRole }: RoleGuardProps) {
  const router = useRouter();
  const { setUserRole } = useWeddingOS();
  const [status, setStatus] = useState<"loading" | "ok" | "denied">("loading");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/v1/auth/verify")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;

        if (!data?.authenticated || !data.user?.role) {
          router.replace("/giris");
          return;
        }

        const role = data.user.role as "COUPLE" | "VENDOR" | "ADMIN";
        setUserRole(role === "ADMIN" ? "ADMIN" : role);

        if (role !== allowedRole) {
          setStatus("denied");
          router.replace(dashboardPathForRole(role));
          return;
        }

        setStatus("ok");
      })
      .catch(() => {
        if (!cancelled) router.replace("/giris");
      });

    return () => {
      cancelled = true;
    };
  }, [allowedRole, router, setUserRole]);

  if (status !== "ok") {
    return (
      <div className="min-h-screen bg-[#F8F8F7] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-[#111111] text-white rounded-full flex items-center justify-center mb-4 shadow-md">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-[24px] font-medium text-[#111111] tracking-tight mb-2">
          {status === "denied" ? "Erişim Sınırlandırıldı" : "Oturum Doğrulanıyor"}
        </h2>
        <p className="text-[14px] text-[#666666] max-w-[400px]">
          {status === "denied"
            ? "Bu sayfa için yetkiniz yok. Yönlendiriliyorsunuz..."
            : "Güvenli oturumunuz kontrol ediliyor..."}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
