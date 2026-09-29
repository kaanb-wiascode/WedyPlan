import { NextResponse } from 'next/server';
import { loadLiveCatalogVendors } from '@/lib/vendor/workspace';

export async function GET() {
  try {
    const vendors = await loadLiveCatalogVendors({
      category: 'dugun-mekanlari',
      city: 'istanbul',
      limit: 3,
    });

    return NextResponse.json({
      vendors,
      count: vendors.length,
      source: 'LIVE_VENDOR_CATALOG',
    });
  } catch (error: unknown) {
    console.error('Featured vendor catalog failed:', error);
    return NextResponse.json(
      { vendors: [], count: 0, error: 'Öne çıkan firmalar yüklenemedi.' },
      { status: 500 },
    );
  }
}
