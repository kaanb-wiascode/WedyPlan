import Image from 'next/image';
import Link from 'next/link';

export type LogoVariant = 'main' | 'couple' | 'vendor' | 'admin' | 'marketplace' | 'icon';

interface BrandLogoProps {
  variant?: LogoVariant;
  width?: number;
  height?: number;
  className?: string;
  href?: string;
}

const logoPaths: Record<LogoVariant, string> = {
  main: '/assets/branding/logo-main.svg',
  couple: '/assets/branding/logo-couple.svg',
  vendor: '/assets/branding/logo-vendor.svg',
  admin: '/assets/branding/logo-admin.svg',
  marketplace: '/assets/branding/logo-marketplace.svg',
  icon: '/assets/branding/logo-icon.svg',
};

const defaultHrefs: Record<LogoVariant, string> = {
  main: '/',
  couple: '/cift/dashboard',
  vendor: '/firma/dashboard',
  admin: '/admin/dashboard',
  marketplace: '/firmalar',
  icon: '/',
};

export function BrandLogo({
  variant = 'main',
  width = 180,
  height = 40,
  className = '',
  href,
}: BrandLogoProps) {
  const logoSrc = logoPaths[variant];
  const targetHref = href ?? defaultHrefs[variant];

  const logoImage = (
    <Image
      src={logoSrc}
      alt={`WedyPlan ${variant.toUpperCase()} Logo`}
      width={width}
      height={height}
      className={`h-auto w-auto object-contain ${className}`}
      priority
    />
  );

  if (targetHref) {
    return (
      <Link href={targetHref} className="inline-block transition-opacity hover:opacity-90">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
}