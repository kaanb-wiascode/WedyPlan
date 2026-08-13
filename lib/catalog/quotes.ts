export type CatalogLead = {
  id: string;
  vendorId: string | null;
  vendorName: string;
  categorySlug: string;
  city: string;
  district: string;
  coupleNames: string;
  phone: string;
  email?: string;
  weddingDate: string;
  guestCount: number;
  note: string;
  createdAt: string;
  status: "PENDING";
};

export type CatalogLeadInput = Omit<CatalogLead, "id" | "createdAt" | "status">;

const STORAGE_KEY = "wedyplan_leads";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getCatalogLeads(): CatalogLead[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CatalogLead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCatalogLead(input: CatalogLeadInput): CatalogLead {
  const lead: CatalogLead = {
    ...input,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: "PENDING",
  };

  if (canUseStorage()) {
    const next = [lead, ...getCatalogLeads()].slice(0, 80);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("wedyplan:leads"));
    fetch("/api/public/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    }).catch(() => {});
  }

  return lead;
}

export function formatLeadTime(iso: string) {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const minutes = Math.max(1, Math.round(diff / 60000));
  if (minutes < 60) return `${minutes} dakika önce`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} saat önce`;
  const days = Math.round(hours / 24);
  return `${days} gün önce`;
}
