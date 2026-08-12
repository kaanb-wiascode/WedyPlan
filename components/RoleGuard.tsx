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
      <div className="apple-page flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0071e3] text-white">
          <Lock className="h-7 w-7" />
        </div>
        <h2 className="mb-2 text-[24px] font-semibold tracking-tight text-[#1d1d1f]">
          {status === "denied" ? "Erişim Sınırlandırıldı" : "Oturum Doğrulanıyor"}
        </h2>
        <p className="max-w-[400px] text-[14px] text-[#86868b]">
          {status === "denied"
            ? "Bu sayfa için yetkiniz yok. Yönlendiriliyorsunuz..."
            : "Güvenli oturumunuz kontrol ediliyor..."}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
