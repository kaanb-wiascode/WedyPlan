'use server';

import { db } from '@/lib/db';

export interface VendorFilterParams {
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  page?: number;
  limit?: number;
}

/**
 * Filtrelere göre gerçek veritabanından tedarikçileri/firmaları getirir.
 */
export async function getVendorsAction(params: VendorFilterParams) {
  try {
    const {
      category,
      city,
      minPrice,
      maxPrice,
      searchQuery,
      page = 1,
      limit = 12,
    } = params;

    const skip = (page - 1) * limit;

    // Prisma Where Filtreleri
    const whereClause: any = {};

    if (category) {
      whereClause.category = { equals: category, mode: 'insensitive' };
    }

    if (city) {
      whereClause.city = { equals: city, mode: 'insensitive' };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.startingPrice = {};
      if (minPrice !== undefined) whereClause.startingPrice.gte = minPrice;
      if (maxPrice !== undefined) whereClause.startingPrice.lte = maxPrice;
    }

    if (searchQuery) {
      whereClause.OR = [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }

    // Toplam kayıt ve sayfalama verileri (Prisma modelinizdeki PortalProfile / Listing sorguları)
    const [vendors, totalCount] = await Promise.all([
      db.portalProfile.findMany({
        where: {
          userType: 'VENDOR',
          ...whereClause,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      db.portalProfile.count({
        where: {
          userType: 'VENDOR',
          ...whereClause,
        },
      }),
    ]);

    return {
      success: true,
      data: vendors,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error: any) {
    console.error('❌ getVendorsAction hatası:', error);
    return {
      success: false,
      error: 'Tedarikçiler yüklenirken bir hata oluştu.',
      data: [],
    };
  }
}

/**
 * ID'ye göre tek bir tedarikçinin profil detayını getirir.
 */
export async function getVendorByIdAction(vendorId: string) {
  try {
    const vendor = await db.portalProfile.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      return { success: false, error: 'Tedarikçi bulunamadı.' };
    }

    return { success: true, data: vendor };
  } catch (error: any) {
    console.error('❌ getVendorByIdAction hatası:', error);
    return { success: false, error: 'Tedarikçi detayı alınamadı.' };
  }
}