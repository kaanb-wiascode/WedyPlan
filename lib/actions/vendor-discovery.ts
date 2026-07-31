// lib/actions/vendor-discovery.ts
'use server';

import { db } from '@/lib/db';

export interface VendorFilterParams {
  category?: string;
  city?: string;
  search?: string;
  limit?: number;
}

// 1. Veritabanından filtrelenmiş satıcı/firma listesini getir
export async function getVendors(params?: VendorFilterParams) {
  try {
    const vendorModel = (db as any).vendor || (db as any).firm;

    if (!vendorModel) {
      return { success: false, error: 'Satıcı veritabanı modeli bulunamadı.' };
    }

    const whereClause: any = {};

    if (params?.category && params.category !== 'ALL') {
      whereClause.category = params.category;
    }

    if (params?.city && params.city !== 'ALL') {
      whereClause.city = {
        contains: params.city,
        mode: 'insensitive',
      };
    }

    if (params?.search) {
      whereClause.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const vendors = await vendorModel.findMany({
      where: whereClause,
      take: params?.limit || 20,
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: vendors,
    };
  } catch (error) {
    console.error('Satıcılar çekilirken hata:', error);
    return { success: false, error: 'Satıcı listesi yüklenemedi.' };
  }
}

// 2. Tekil satıcı detayını getir
export async function getVendorById(id: string) {
  try {
    const vendorModel = (db as any).vendor || (db as any).firm;

    const vendor = await vendorModel.findUnique({
      where: { id },
    });

    if (!vendor) {
      return { success: false, error: 'Firma bulunamadı.' };
    }

    return { success: true, data: vendor };
  } catch (error) {
    console.error('Firma detayı alınırken hata:', error);
    return { success: false, error: 'Firma bilgisi alınamadı.' };
  }
}