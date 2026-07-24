import Link from "next/link";

const navLinks = [
  { href: "/mekanlar", label: "Mekanlar" },
  { href: "/fotografcilar", label: "Fotoğrafçılar" },
  { href: "/gelinlik", label: "Gelinlik" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-wedy-purple/5 bg-wedy-cream/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-wedy-pink to-wedy-purple shadow-sm shadow-wedy-pink/20 transition-transform group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-white"
              aria-hidden
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-wedy-pink">Wedy</span>
            <span className="text-wedy-purple">Plan</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-wedy-purple/70 transition-colors hover:text-wedy-pink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/firma-girisi"
          className="rounded-full bg-wedy-pink px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-wedy-pink/25 transition-all hover:bg-wedy-pink/90 hover:shadow-lg hover:shadow-wedy-pink/30"
        >
          Firma Girişi
        </Link>
      </nav>
    </header>
  );
}
