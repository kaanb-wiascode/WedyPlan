const categories = [
  { value: "", label: "Kategori Seç" },
  { value: "mekan", label: "Düğün Mekanı" },
  { value: "fotografci", label: "Fotoğrafçı" },
  { value: "gelinlik", label: "Gelinlik" },
  { value: "cicekci", label: "Çiçekçi" },
  { value: "muzik", label: "Müzik & DJ" },
];

const cities = [
  { value: "", label: "Şehir Seç" },
  { value: "istanbul", label: "İstanbul" },
  { value: "izmir", label: "İzmir" },
  { value: "ankara", label: "Ankara" },
  { value: "antalya", label: "Antalya" },
  { value: "bursa", label: "Bursa" },
];

export function SearchCard() {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <form
          className="rounded-3xl border border-black/10 bg-white/60 backdrop-blur-xl p-4 shadow-2xl shadow-black/5 sm:p-6"
          action="/arama"
          method="get"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <label
                htmlFor="category"
                className="block font-sans-corporate text-xs font-bold uppercase tracking-wider text-[#666666]"
              >
                Kategori
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="kategori"
                  defaultValue=""
                  className="w-full appearance-none rounded-xl border border-black/10 bg-white/80 px-4 py-3.5 pr-10 text-sm font-medium text-[#111111] outline-none transition-colors focus:border-[#111111]"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value} disabled={!cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <ChevronIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#666666]" />
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <label
                htmlFor="city"
                className="block font-sans-corporate text-xs font-bold uppercase tracking-wider text-[#666666]"
              >
                Şehir
              </label>
              <div className="relative">
                <select
                  id="city"
                  name="sehir"
                  defaultValue=""
                  className="w-full appearance-none rounded-xl border border-black/10 bg-white/80 px-4 py-3.5 pr-10 text-sm font-medium text-[#111111] outline-none transition-colors focus:border-[#111111]"
                >
                  {cities.map((city) => (
                    <option key={city.value} value={city.value} disabled={!city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
                <ChevronIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#666666]" />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] px-8 py-3.5 font-sans-corporate text-sm font-medium text-[#F5F4F0] shadow-md transition-all hover:bg-[#222222] sm:w-auto sm:min-w-[160px]"
            >
              <SearchIcon />
              Mekan Bul
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`h-5 w-5 ${className ?? ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}