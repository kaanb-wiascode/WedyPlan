export type CatalogGroupId = "mekanlar" | "firmalar" | "moda" | "organizasyon" | "diger";

export type CatalogCategory = {
  slug: string;
  name: string;
  group: CatalogGroupId;
  parentSlug?: string;
  description: string;
  isVenue: boolean;
  vendorCount: number;
};

export type CatalogCity = {
  slug: string;
  name: string;
  districts: string[];
};

export const CATALOG_GROUPS: { id: CatalogGroupId; name: string }[] = [
  { id: "mekanlar", name: "Mekanlar" },
  { id: "firmalar", name: "Düğün Firmaları" },
  { id: "moda", name: "Moda & Giyim" },
  { id: "organizasyon", name: "Organizasyon & Detay" },
  { id: "diger", name: "Daha Fazlası" },
];

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  { slug: "dugun-mekanlari", name: "Düğün Mekanları", group: "mekanlar", description: "Salon, kır, otel ve tarihi mekanlar dahil tüm düğün alanları.", isVenue: true, vendorCount: 2315 },
  { slug: "kir-dugunu", name: "Kır Düğünü", group: "mekanlar", parentSlug: "dugun-mekanlari", description: "Açık hava, bahçe ve kır düğünü mekanları.", isVenue: true, vendorCount: 640 },
  { slug: "oteller", name: "Otel Düğünü", group: "mekanlar", parentSlug: "dugun-mekanlari", description: "Otel davet alanları ve balo salonları.", isVenue: true, vendorCount: 410 },
  { slug: "tarihi-mekanlar", name: "Tarihi Mekanlar", group: "mekanlar", parentSlug: "dugun-mekanlari", description: "Yalı, han, köşk ve tarihi davet alanları.", isVenue: true, vendorCount: 180 },
  { slug: "dugun-salonlari", name: "Düğün Salonları", group: "mekanlar", parentSlug: "dugun-mekanlari", description: "Kapalı düğün ve davet salonları.", isVenue: true, vendorCount: 720 },
  { slug: "sosyal-tesisler", name: "Sosyal Tesisler", group: "mekanlar", parentSlug: "dugun-mekanlari", description: "Belediye ve kurum sosyal tesisleri.", isVenue: true, vendorCount: 210 },
  { slug: "kulupler-davet-alanlari", name: "Balo ve Davet Salonları", group: "mekanlar", parentSlug: "dugun-mekanlari", description: "Kulüp, davet evi ve balo salonları.", isVenue: true, vendorCount: 265 },
  { slug: "tekne-dugunu", name: "Tekne Düğünü", group: "mekanlar", parentSlug: "dugun-mekanlari", description: "Boğaz ve sahil tekne düğünleri.", isVenue: true, vendorCount: 95 },
  { slug: "nikah-salonlari", name: "Nikah Salonları", group: "mekanlar", parentSlug: "dugun-mekanlari", description: "Resmi nikah ve küçük tören salonları.", isVenue: true, vendorCount: 140 },
  { slug: "nikah-sonrasi-yemegi", name: "Nikah Sonrası Yemeği", group: "mekanlar", parentSlug: "dugun-mekanlari", description: "Nikah sonrası yemek ve kokteyl mekanları.", isVenue: true, vendorCount: 160 },
  { slug: "after-party", name: "After Party", group: "mekanlar", parentSlug: "dugun-mekanlari", description: "Düğün sonrası after party mekanları.", isVenue: true, vendorCount: 88 },
  { slug: "soz-nisan-mekanlari", name: "Söz & Nişan Mekanları", group: "mekanlar", parentSlug: "dugun-mekanlari", description: "Söz, nişan ve kız isteme davet evleri.", isVenue: true, vendorCount: 190 },
  { slug: "gelinlik", name: "Gelinlik", group: "moda", description: "Gelinlik modelleri, kesimler ve atölyeler.", isVenue: false, vendorCount: 531 },
  { slug: "damatlik", name: "Damatlık", group: "moda", description: "Damatlık ve damat giyim.", isVenue: false, vendorCount: 210 },
  { slug: "abiye-ve-nisanlik", name: "Abiye ve Nişanlık", group: "moda", description: "Nişanlık, abiye ve özel dikim.", isVenue: false, vendorCount: 175 },
  { slug: "gelin-ayakkabisi-ve-aksesuarlari", name: "Gelin Ayakkabısı ve Aksesuar", group: "moda", description: "Ayakkabı, duvak, eldiven ve aksesuar.", isVenue: false, vendorCount: 120 },
  { slug: "dugun-fotografcilari", name: "Düğün Fotoğrafçıları", group: "firmalar", description: "Fotoğraf, video ve düğün hikâyesi ekipleri.", isVenue: false, vendorCount: 938 },
  { slug: "dugun-organizasyon", name: "Düğün Organizasyon", group: "firmalar", description: "Konsept, süsleme ve tam organizasyon.", isVenue: false, vendorCount: 296 },
  { slug: "gelin-saci-ve-makyaji", name: "Gelin Saçı ve Makyajı", group: "firmalar", description: "Gelin saçı, makyaj ve prova stüdyoları.", isVenue: false, vendorCount: 1333 },
  { slug: "muzik", name: "Müzik", group: "firmalar", description: "DJ, orkestra ve canlı müzik.", isVenue: false, vendorCount: 238 },
  { slug: "evlilik-teklifi", name: "Evlilik Teklifi", group: "firmalar", description: "Evlilik teklifi organizasyonu.", isVenue: false, vendorCount: 83 },
  { slug: "kina-ve-bekarliga-veda", name: "Kına ve Bekarlığa Veda", group: "organizasyon", description: "Kına gecesi ve bekarlığa veda.", isVenue: false, vendorCount: 240 },
  { slug: "kina-ve-bekarliga-veda-mekan", name: "Kına Mekanları", group: "mekanlar", parentSlug: "kina-ve-bekarliga-veda", description: "Kına ve bekarlığa veda mekanları.", isVenue: true, vendorCount: 110 },
  { slug: "kina-ve-bekarliga-veda-organizasyon", name: "Kına Organizasyon", group: "organizasyon", parentSlug: "kina-ve-bekarliga-veda", description: "Kına organizasyon ekipleri.", isVenue: false, vendorCount: 90 },
  { slug: "kina-ve-bekarliga-veda-aksesuar", name: "Kına Aksesuar", group: "organizasyon", parentSlug: "kina-ve-bekarliga-veda", description: "Kına tefi, kaftan ve aksesuar.", isVenue: false, vendorCount: 70 },
  { slug: "catering-hizmetleri", name: "Catering Hizmetleri", group: "organizasyon", description: "Düğün yemek ve ikram hizmeti.", isVenue: false, vendorCount: 155 },
  { slug: "gelin-arabasi", name: "Gelin Arabası", group: "organizasyon", description: "Klasik ve lüks gelin arabası.", isVenue: false, vendorCount: 102 },
  { slug: "dugun-davetiyesi", name: "Düğün Davetiyesi", group: "organizasyon", description: "Basılı ve dijital davetiye.", isVenue: false, vendorCount: 148 },
  { slug: "nikah-sekeri-ve-hediyelik", name: "Nikah Şekeri ve Hediyelik", group: "organizasyon", description: "Nikah şekeri ve hediyelik.", isVenue: false, vendorCount: 134 },
  { slug: "dans-kurslari", name: "Dans Kursları", group: "diger", description: "Düğün vals ve dans dersleri.", isVenue: false, vendorCount: 76 },
  { slug: "alyans-ve-taki", name: "Alyans ve Takı", group: "moda", description: "Alyans, set ve takı.", isVenue: false, vendorCount: 188 },
  { slug: "balayi", name: "Balayı", group: "diger", description: "Balayı oteli ve paketleri.", isVenue: false, vendorCount: 64 },
  { slug: "cicekciler", name: "Çiçekçiler", group: "organizasyon", description: "Gelin buketi ve mekan çiçeği.", isVenue: false, vendorCount: 167 },
  { slug: "alternatif-fikirler", name: "Alternatif Fikirler", group: "diger", description: "Botanik, mikro düğün ve farklı konseptler.", isVenue: false, vendorCount: 52 },
  { slug: "dugun-pastasi", name: "Düğün Pastası", group: "organizasyon", description: "Butik düğün pastası.", isVenue: false, vendorCount: 121 },
  { slug: "evlendirme-daireleri", name: "Evlendirme Daireleri", group: "diger", description: "Nikah işlemleri ve evlendirme daireleri.", isVenue: false, vendorCount: 81 },
  { slug: "guzellik-merkezleri", name: "Güzellik Merkezleri", group: "firmalar", description: "Cilt bakımı, epilasyon ve gelin hazırlığı.", isVenue: false, vendorCount: 290 },
  { slug: "isik-ses-ve-duzenleme", name: "Işık, Ses ve Düzenleme", group: "organizasyon", description: "Sahne, ışık, ses ve teknik prodüksiyon.", isVenue: false, vendorCount: 98 },
];

const CITY_DISTRICTS: Record<string, string[]> = {
  istanbul: ["Kadıköy", "Beşiktaş", "Sarıyer", "Beykoz", "Şişli", "Bakırköy", "Üsküdar", "Maltepe", "Pendik", "Başakşehir", "Eyüpsultan", "Silivri"],
  ankara: ["Çankaya", "Gölbaşı", "Yenimahalle", "Keçiören", "Etimesgut"],
  izmir: ["Konak", "Karşıyaka", "Urla", "Çeşme", "Bornova", "Balçova"],
  antalya: ["Muratpaşa", "Konyaaltı", "Lara", "Belek", "Side", "Kaş"],
  bursa: ["Nilüfer", "Osmangazi", "Mudanya", "Yıldırım"],
  mugla: ["Bodrum", "Fethiye", "Marmaris", "Datça"],
  gaziantep: ["Şahinbey", "Şehitkamil"],
  kocaeli: ["İzmit", "Gebze", "Başiskele"],
};

const CITY_NAMES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin",
  "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur",
  "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan",
  "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul",
  "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kırıkkale", "Kırklareli", "Kırşehir",
  "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş",
  "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas",
  "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat",
  "Zonguldak", "Kıbrıs",
];

function toSlug(name: string) {
  return name
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replaceAll(" ", "-");
}

export const CATALOG_CITIES: CatalogCity[] = CITY_NAMES.map((name) => {
  const slug = toSlug(name);
  return { slug, name, districts: CITY_DISTRICTS[slug] ?? [name] };
});

export const CATALOG_SLUGS = new Set(CATALOG_CATEGORIES.map((c) => c.slug));
export const CITY_SLUGS = new Set(CATALOG_CITIES.map((c) => c.slug));

export function isCatalogCategorySlug(slug?: string) {
  return Boolean(slug && CATALOG_SLUGS.has(slug));
}

export function getCategory(slug: string) {
  return CATALOG_CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function getCity(slug: string) {
  return CATALOG_CITIES.find((c) => c.slug === slug) ?? null;
}

export function categoriesInGroup(group: CatalogGroupId) {
  return CATALOG_CATEGORIES.filter((c) => c.group === group);
}

export function venueCategories() {
  return CATALOG_CATEGORIES.filter((c) => c.isVenue);
}

export function catalogHref(category: string, city?: string, slug?: string) {
  if (city && slug) return `/${category}/${city}/${slug}`;
  if (city) return `/${category}/${city}`;
  return `/${category}`;
}

export const MAJOR_CITY_SLUGS = ["istanbul", "ankara", "izmir", "antalya", "bursa", "mugla", "gaziantep", "kocaeli"];
