const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

export const MEDIA_BY_GROUP: Record<string, string[]> = {
  mekanlar: [
    u("1519167758481-83f550bb49b3"),
    u("1465495976277-4387d4b0b4c6"),
    u("1519225421980-715cb0215aed"),
    u("1511795409834-ef04bbd61622"),
    u("1464366400600-7168b8af9bc3"),
    u("1478146896981-b80fe57a16be"),
    u("1414235077428-338989a2e8c0"),
    u("1551882547-ff40c63fe5fa"),
    u("1566073771259-6a8506099945"),
    u("1527838832700-54595d2f119b"),
  ],
  firmalar: [
    u("1537633552985-df8429e8048b"),
    u("1511285560929-80b456fea0bc"),
    u("1492691527719-9d1e07e534b4"),
    u("1452587921488-3e241aa57fe5"),
    u("1516035069371-29a1b244cc32"),
    u("1470225620780-dba8ba36b745"),
    u("1487412947147-5cebf100ffc2"),
    u("1520854221256-17451cc331bf"),
  ],
  moda: [
    u("1594552072238-b8a33785b261"),
    u("1515372039744-b8f02a3ae446"),
    u("1490481651871-ab68de25d43d"),
    u("1521572163474-6864f9cf17ab"),
    u("1487412947147-5cebf100ffc2"),
    u("1507679799987-c73779587ccf"),
  ],
  organizasyon: [
    u("1455659817273-f63b54b91589"),
    u("1487530811176-3780de880c2d"),
    u("1464047736614-af69688eb8a2"),
    u("1511795409834-ef04bbd61622"),
    u("1478146896981-b80fe57a16be"),
    u("1519225421980-715cb0215aed"),
  ],
  diger: [
    u("1522708323590-d24e4e828aff"),
    u("1507525428034-b723cf961d3e"),
    u("1520250497591-112f2f40a3f4"),
    u("1515562141207-7a88fb7ce338"),
  ],
};

export const CATEGORY_COVER: Record<string, string> = {
  "dugun-mekanlari": MEDIA_BY_GROUP.mekanlar[0],
  "kir-dugunu": MEDIA_BY_GROUP.mekanlar[1],
  oteller: u("1566073771259-6a8506099945"),
  "tarihi-mekanlar": u("1527838832700-54595d2f119b"),
  "dugun-salonlari": MEDIA_BY_GROUP.mekanlar[3],
  "sosyal-tesisler": MEDIA_BY_GROUP.mekanlar[4],
  "kulupler-davet-alanlari": MEDIA_BY_GROUP.mekanlar[5],
  "tekne-dugunu": u("1507525428034-b723cf961d3e"),
  "nikah-salonlari": MEDIA_BY_GROUP.mekanlar[6],
  "nikah-sonrasi-yemegi": u("1414235077428-338989a2e8c0"),
  "after-party": MEDIA_BY_GROUP.firmalar[5],
  "soz-nisan-mekanlari": MEDIA_BY_GROUP.mekanlar[7],
  gelinlik: MEDIA_BY_GROUP.moda[0],
  damatlik: u("1507679799987-c73779587ccf"),
  "abiye-ve-nisanlik": MEDIA_BY_GROUP.moda[1],
  "gelin-ayakkabisi-ve-aksesuarlari": MEDIA_BY_GROUP.moda[2],
  "dugun-fotografcilari": MEDIA_BY_GROUP.firmalar[0],
  "dugun-organizasyon": MEDIA_BY_GROUP.organizasyon[0],
  "gelin-saci-ve-makyaji": u("1487412947147-5cebf100ffc2"),
  muzik: MEDIA_BY_GROUP.firmalar[5],
  "evlilik-teklifi": MEDIA_BY_GROUP.firmalar[7],
  "kina-ve-bekarliga-veda": MEDIA_BY_GROUP.organizasyon[1],
  "catering-hizmetleri": u("1414235077428-338989a2e8c0"),
  "gelin-arabasi": u("1503376780353-7e6692767b70"),
  "dugun-davetiyesi": MEDIA_BY_GROUP.mekanlar[5],
  "nikah-sekeri-ve-hediyelik": MEDIA_BY_GROUP.organizasyon[0],
  "dans-kurslari": MEDIA_BY_GROUP.firmalar[5],
  "alyans-ve-taki": u("1515562141207-7a88fb7ce338"),
  balayi: u("1520250497591-112f2f40a3f4"),
  cicekciler: MEDIA_BY_GROUP.organizasyon[0],
  "dugun-pastasi": MEDIA_BY_GROUP.organizasyon[3],
  "guzellik-merkezleri": u("1487412947147-5cebf100ffc2"),
  "isik-ses-ve-duzenleme": MEDIA_BY_GROUP.firmalar[5],
};

export const CITY_COVER: Record<string, string> = {
  istanbul: u("1527838832700-54595d2f119b"),
  ankara: u("1566073771259-6a8506099945"),
  izmir: u("1507525428034-b723cf961d3e"),
  antalya: u("1520250497591-112f2f40a3f4"),
  bursa: u("1544077960-604201fe74bc"),
  mugla: u("1507525428034-b723cf961d3e"),
  gaziantep: u("1551882547-ff40c63fe5fa"),
  kocaeli: u("1464366400600-7168b8af9bc3"),
};

export function imagesForCategory(group: string, slug: string) {
  const cover = CATEGORY_COVER[slug];
  const pool = MEDIA_BY_GROUP[group] ?? MEDIA_BY_GROUP.mekanlar;
  return cover ? [cover, ...pool.filter((src) => src !== cover)] : pool;
}

export function categoryCover(slug: string, group = "mekanlar") {
  return CATEGORY_COVER[slug] ?? MEDIA_BY_GROUP[group]?.[0] ?? MEDIA_BY_GROUP.mekanlar[0];
}

export function cityCover(slug: string) {
  return CITY_COVER[slug] ?? MEDIA_BY_GROUP.mekanlar[0];
}
