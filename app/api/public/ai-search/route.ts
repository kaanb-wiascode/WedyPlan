import { NextRequest, NextResponse } from 'next/server';
import { loadLiveCatalogVendors } from '@/lib/vendor/workspace';
import type { AiSearchVendor } from '@/types/ai-search';
import type { CatalogVendor } from '@/lib/catalog/listings';

function normalize(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFKD')
    .replace(/[^a-z0-9çğıöşü\s-]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function positiveNumber(value: string | null) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function scoreVendor(
  vendor: CatalogVendor,
  input: {
    prompt: string;
    category: string;
    city: string;
    maxBudget: number;
    minCapacity: number;
    verifiedOnly: boolean;
    minRating: number;
  },
): AiSearchVendor | null {
  if (input.category && vendor.categoryName !== input.category) return null;
  if (input.city && vendor.city !== input.city) return null;
  if (input.maxBudget > 0 && vendor.price > input.maxBudget) return null;
  if (input.minCapacity > 0 && vendor.capacityMax < input.minCapacity) return null;
  if (input.verifiedOnly && !vendor.isVerified) return null;
  if (input.minRating > 0 && vendor.rating < input.minRating) return null;

  const searchable = normalize(
    [
      vendor.name,
      vendor.categoryName,
      vendor.city,
      vendor.district,
      vendor.story,
      ...vendor.tags,
      ...vendor.features,
    ].join(' '),
  );

  const promptTokens = normalize(input.prompt)
    .split(' ')
    .filter((token) => token.length >= 3);

  const matchedTokens = promptTokens.filter((token) =>
    searchable.includes(token),
  );

  const breakdown: string[] = [];
  let score = 45;

  if (matchedTokens.length > 0) {
    score += Math.min(25, matchedTokens.length * 5);
    breakdown.push(
      `Arama ifadenizdeki ${matchedTokens.slice(0, 4).join(', ')} kriterleri firma verisiyle eşleşiyor.`,
    );
  }

  if (input.category && vendor.categoryName === input.category) {
    score += 10;
    breakdown.push('Seçtiğiniz hizmet kategorisiyle eşleşiyor.');
  }

  if (input.city && vendor.city === input.city) {
    score += 8;
    breakdown.push(`${vendor.city} konum kriterini karşılıyor.`);
  }

  if (input.maxBudget > 0 && vendor.price <= input.maxBudget) {
    score += 7;
    breakdown.push('Başlangıç fiyatı belirttiğiniz bütçe sınırı içinde.');
  }

  if (input.minCapacity > 0 && vendor.capacityMax >= input.minCapacity) {
    score += 5;
    breakdown.push(
      `Kapasitesi en az ${input.minCapacity} kişilik ihtiyacınızı karşılıyor.`,
    );
  }

  if (vendor.isVerified) {
    score += 3;
    breakdown.push('WedyPlan üzerinde doğrulanmış firma.');
  }

  if (breakdown.length === 0) {
    breakdown.push(
      'Yayındaki firma verileri içinden genel katalog uygunluğuna göre listelendi.',
    );
  }

  return {
    id: vendor.id,
    name: vendor.name,
    category: vendor.categoryName,
    city: vendor.city,
    district: vendor.district,
    startingPrice: vendor.price,
    capacity: vendor.capacityMax,
    rating: vendor.rating,
    reviewCount: vendor.reviewCount,
    matchScore: Math.min(99, score),
    matchBreakdown: breakdown.slice(0, 3),
    imageUrl: vendor.imageUrl,
    tags: vendor.tags,
    isVerified: vendor.isVerified,
    isAvailable: false,
  };
}

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const input = {
      prompt: params.get('q')?.trim() || '',
      category: params.get('category')?.trim() || '',
      city: params.get('city')?.trim() || '',
      maxBudget: positiveNumber(params.get('maxBudget')),
      minCapacity: positiveNumber(params.get('minCapacity')),
      verifiedOnly: params.get('verifiedOnly') === 'true',
      minRating: positiveNumber(params.get('minRating')),
    };

    const liveVendors = await loadLiveCatalogVendors({ limit: 100 });

    const vendors = liveVendors
      .map((vendor) => scoreVendor(vendor, input))
      .filter((vendor): vendor is AiSearchVendor => Boolean(vendor))
      .sort((a, b) => b.matchScore - a.matchScore || b.rating - a.rating)
      .slice(0, 40);

    return NextResponse.json({
      vendors,
      count: vendors.length,
      source: 'LIVE_VENDOR_CATALOG',
    });
  } catch (error: unknown) {
    console.error('AI search catalog error:', error);
    return NextResponse.json(
      { vendors: [], count: 0, error: 'Firma araması şu anda tamamlanamadı.' },
      { status: 500 },
    );
  }
}
