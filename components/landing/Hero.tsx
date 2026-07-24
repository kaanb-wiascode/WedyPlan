export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-wedy-pink/10 blur-3xl" />
        <div className="absolute top-32 right-0 h-72 w-72 rounded-full bg-wedy-purple/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-wedy-pink/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-wedy-purple/10 bg-white/60 px-4 py-1.5 text-sm font-medium text-wedy-purple/80 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-wedy-pink" />
          Türkiye&apos;nin düğün planlama platformu
        </p>

        <h1 className="text-4xl font-bold leading-tight tracking-tight text-wedy-purple sm:text-5xl lg:text-6xl">
          Hayalindeki{" "}
          <span className="bg-linear-to-r from-wedy-pink to-wedy-purple bg-clip-text text-transparent">
            Düğünü
          </span>{" "}
          Planla
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-wedy-purple/65 sm:text-xl">
          Mekan, fotoğrafçı, gelinlik ve daha fazlası — hayalinizdeki düğünü
          planlamak için ihtiyacınız olan her şey tek bir yerde.
        </p>
      </div>
    </section>
  );
}
