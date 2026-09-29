export type CatalogLead = {
  id: string;
  vendorId: string | null;
  vendorName: string;
  categorySlug: string;
  city: string;
  district: string;
  coupleNames: string;
  phone: string;
  email?: string | null;
  weddingDate: string | null;
  guestCount: number;
  note: string;
  createdAt: string;
  status: 'PENDING';
};

export type CatalogLeadInput = Omit<
  CatalogLead,
  'id' | 'createdAt' | 'status' | 'weddingDate'
> & {
  weddingDate?: string | null;
};

type LeadApiResponse = {
  success?: boolean;
  lead?: CatalogLead;
  error?: string;
};

export async function saveCatalogLead(
  input: CatalogLeadInput,
): Promise<CatalogLead> {
  const response = await fetch('/api/public/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const payload = (await response.json().catch(() => ({}))) as LeadApiResponse;

  if (!response.ok || !payload.success || !payload.lead) {
    throw new Error(payload.error || 'Teklif talebi kaydedilemedi.');
  }

  return payload.lead;
}
