"use client";

import React, { useState } from "react";
import AdminTenantsHeader from "./AdminTenantsHeader";
import AITenantCapacityWidget from "./AITenantCapacityWidget";
import TenantListBentoGrid from "./TenantListBentoGrid";
import TenantInspectorDrawer from "./TenantInspectorDrawer";
import { createPlatformTenantAction } from "@/lib/actions/admin-tenants";

export default function AdminTenantsClient() {
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [aiReport] = useState({
    multiTenantHealthScore: 98,
    activeTenantsCount: 8,
    isolatedDatabasesCount: 2,
    aiAnalysis: "Tüm White-Label ve Bölgesel kiracılar %99.99 veritabanı izolasyon standartlarına uygundur. 'Dubai Royal Events' kiracısının depolama kullanımı %88 seviyesine ulaşmıştır.",
    capacityForecast: "Gelecek 30 gün içinde 'WedyPlan-DE' Franchise kiracısının AI kredi kullanımının 2 katına çıkacağı tahmin edilmektedir.",
    costOptimizationRecommendation: "'SHARED_SCHEMA' kullanan 4 küçük ölçekli kiracının tek bir veritabanı havuzunda birleştirilmesi bulut maliyetini $420/Ay düşürecektir.",
  });

  const [tenants, setTenants] = useState([
    {
      id: "tnt_101",
      name: "WedyPlan Global HQ",
      slug: "wedyplan-global",
      type: "WEDYPLAN_GLOBAL",
      isolation: "DEDICATED_DATABASE",
      subdomain: "global.wedyplan.com",
      customDomain: "wedyplan.com",
      status: "ACTIVE",
      usedStorageGb: 142.0,
      storageLimitGb: 2000,
      aiCreditQuota: 1000000,
      defaultCurrency: "USD",
    },
    {
      id: "tnt_102",
      name: "Dubai Royal Events White-Label",
      slug: "dubai-royal-events",
      type: "WHITE_LABEL_PARTNER",
      isolation: "ISOLATED_SCHEMA",
      subdomain: "dubai.wedyplan.com",
      customDomain: "events.dubairoyals.com",
      status: "ACTIVE",
      usedStorageGb: 440.0,
      storageLimitGb: 500,
      aiCreditQuota: 250000,
      defaultCurrency: "AED",
    },
  ]);

  const handleCreateTenant = async () => {
    const res = await createPlatformTenantAction({
      name: "WedyPlan Deutschland GmbH",
      slug: "wedyplan-de",
      type: "FRANCHISE",
      isolation: "SHARED_SCHEMA",
      subdomain: "de.wedyplan.com",
      storageLimitGb: 250,
      aiCreditQuota: 100000,
      defaultCurrency: "EUR",
    });

    if (res.success) {
      setTenants([
        ...tenants,
        {
          id: res.tenantId || "tnt_new_" + Date.now(),
          name: "WedyPlan Deutschland GmbH",
          slug: "wedyplan-de",
          type: "FRANCHISE",
          isolation: "SHARED_SCHEMA",
          subdomain: "de.wedyplan.com",
          customDomain: "wedyplan.de",
          status: "ACTIVE",
          usedStorageGb: 12.0,
          storageLimitGb: 250,
          aiCreditQuota: 100000,
          defaultCurrency: "EUR",
        },
      ]);
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminTenantsHeader
        activeTenantsCount={tenants.length}
        isolatedDbsCount={aiReport.isolatedDatabasesCount}
        multiTenantHealthScore={aiReport.multiTenantHealthScore}
        onOpenNewTenantModal={handleCreateTenant}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AITenantCapacityWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 font-sans">
          <TenantListBentoGrid
            tenants={tenants}
            onSelectTenant={(t) => {
              setSelectedTenant(t);
              setIsDrawerOpen(true);
            }}
          />
        </div>
      </div>

      <TenantInspectorDrawer
        tenant={selectedTenant}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
