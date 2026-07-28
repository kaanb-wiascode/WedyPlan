export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-black/5 blur-3xl" />
        <div className="absolute top-32 right-0 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 font-sans-corporate text-xs font-semibold tracking-wider text-[#444444] uppercase backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#111111]" />
          Türkiye&apos;nin Akıllı Düğün Platformu
        </p>

        <h1 className="font-serif-editorial text-4xl font-normal leading-tight tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
          Hayalindeki{" "}
          <span className="italic font-light">
            Düğünü
          </span>{" "}
          Planla.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl font-sans-corporate text-lg leading-relaxed text-[#555555] sm:text-xl">
          Mekan, fotoğrafçı, gelinlik ve daha fazlası — hayalinizdeki düğünü
          planlamak için ihtiyacınız olan her şey tek bir yerde.
        </p>
      </div>
    </section>
  );
}