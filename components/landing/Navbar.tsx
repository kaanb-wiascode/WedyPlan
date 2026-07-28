import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";

const navLinks = [
  { href: "/mekanlar", label: "Mekanlar" },
  { href: "/fotografcilar", label: "Fotoğrafçılar" },
  { href: "/gelinlik", label: "Gelinlik" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#F5F4F0]/85 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <BrandLogo portal="main" size="md" />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans-corporate text-sm font-medium text-[#444444] transition-colors hover:text-[#111111]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/firma-girisi"
          className="rounded-full bg-[#111111] px-6 py-2.5 font-sans-corporate text-sm font-medium text-[#F5F4F0] shadow-md transition-all hover:bg-[#222222] hover:shadow-lg"
        >
          Firma Girişi
        </Link>
      </nav>
    </header>
  );
}