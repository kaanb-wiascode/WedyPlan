import Link from "next/link";

const categories = [
  {
    title: "Düğün Salonları",
    description: "Şehir merkezinde veya sahil kenarında hayalinizdeki salonu keşfedin.",
    href: "/mekanlar/salon",
    gradient: "from-[#222222] to-[#111111]",
    icon: BuildingIcon,
  },
  {
    title: "Kır Düğünü",
    description: "Doğanın kalbinde, romantik açık hava mekanları ve bahçeler.",
    href: "/mekanlar/kir-dugunu",
    gradient: "from-[#333333] to-[#1A1A1A]",
    icon: TreeIcon,
  },
  {
    title: "Fotoğrafçılar",
    description: "Anılarınızı ölümsüzleştirecek profesyonel düğün fotoğrafçıları.",
    href: "/fotografcilar",
    gradient: "from-[#222222] to-[#111111]",
    icon: CameraIcon,
  },
  {
    title: "Gelinlikçiler",
    description: "Tarzınıza uygun gelinlik ve aksesuar koleksiyonlarını inceleyin.",
    href: "/gelinlik",
    gradient: "from-[#333333] to-[#1A1A1A]",
    icon: DressIcon,
  },
];

export function FeaturedCategories() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-serif-editorial text-3xl font-normal tracking-tight text-[#111111] sm:text-4xl">
            Öne Çıkan Kategoriler
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans-corporate text-sm text-[#666666]">
            Düğününüzün her detayı için en iyi firmaları keşfedin
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl bg-white border border-black/5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`flex h-40 items-center justify-center bg-gradient-to-br ${category.gradient}`}
              >
                <category.icon className="h-14 w-14 text-[#F5F4F0]/90 transition-transform group-hover:scale-110" />
              </div>

              <div className="p-5">
                <h3 className="font-serif-editorial text-xl font-medium text-[#111111]">
                  {category.title}
                </h3>
                <p className="mt-2 font-sans-corporate text-xs leading-relaxed text-[#666666]">
                  {category.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-sans-corporate text-xs font-semibold text-[#111111] opacity-0 transition-opacity group-hover:opacity-100">
                  Keşfet
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 64 64" aria-hidden>
      <path
        d="M8 52V24l24-12 24 12v28H8z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 52V36h16v16M32 24v8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TreeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 64 64" aria-hidden>
      <path
        d="M32 8C26 18 18 22 18 30c0 6 4 10 10 10h8c6 0 10-4 10-10 0-8-8-12-14-22z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 40v16M24 56h16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 64 64" aria-hidden>
      <rect
        x="8"
        y="18"
        width="48"
        height="34"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle cx="32" cy="35" r="10" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M22 18l4-8h12l4 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DressIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 64 64" aria-hidden>
      <path
        d="M32 8l-8 12h16L32 8zM16 24l16 32 16-32H16z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 24c0-4 4-8 8-8s8 4 8 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}