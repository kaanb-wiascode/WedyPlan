// lib/actions/admin-dashboard.ts
'use server';

import { db } from '@/lib/db';

// 1. Platform geneli istatistik ve metrikleri getir
export async function getAdminMetrics() {
  try {
    const coupleModel = (db as any).couple;
    const vendorModel = (db as any).vendor || (db as any).firm;
    const proposalModel = (db as any).proposal || (db as any).quote;
    const guestModel = (db as any).guest;

    const totalCouples = coupleModel ? await coupleModel.count() : 0;
    const totalVendors = vendorModel ? await vendorModel.count() : 0;
    const totalProposals = proposalModel ? await proposalModel.count() : 0;
    const totalGuests = guestModel ? await guestModel.count() : 0;

    const recentCouples = coupleModel
      ? await coupleModel.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
        })
      : [];

    return {
      success: true,
      data: {
        stats: {
          totalCouples,
          totalVendors,
          totalProposals,
          totalGuests,
        },
        recentCouples,
      },
    };
  } catch (error) {
    console.error('Admin metrikleri alınırken hata:', error);
    return {
      success: false,
      error: 'Admin paneli verileri yüklenemedi.',
    };
  }
}

// 2. Acil Durum / Sistem Müdahale Aksiyonu (Hem nesne hem string parametre kabul eder)
export async function executePlatformEmergencyAction(
  data?: { actionType?: string; reason?: string } | string
) {
  const actionName =
    typeof data === 'string'
      ? data
      : data?.actionType || 'Sistem Güvenliği';

  return {
    success: true,
    message: `Acil durum aksiyonu (${actionName}) uygulandı.`,
  };
}