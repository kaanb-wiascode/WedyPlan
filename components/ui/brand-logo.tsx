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

// Canva Min. 40px Standartlarına Göre Hassas Piksel Haritası
const defaultDimensions: Record<LogoVariant, { width: number; height: number; maxHClass: string }> = {
  main:        { width: 180, height: 40, maxHClass: 'max-h-[40px]' }, // 180x40 px
  couple:      { width: 190, height: 42, maxHClass: 'max-h-[42px]' }, // 190x42 px
  vendor:      { width: 190, height: 42, maxHClass: 'max-h-[42px]' }, // 190x42 px
  admin:       { width: 175, height: 40, maxHClass: 'max-h-[40px]' }, // 175x40 px
  marketplace: { width: 180, height: 40, maxHClass: 'max-h-[40px]' }, // 180x40 px
  icon:        { width: 40,  height: 40, maxHClass: 'max-h-[40px]' }, // 40x40 px
};

export function BrandLogo({
  variant = 'main',
  width,
  height,
  className = '',
  href,
}: BrandLogoProps) {
  const logoSrc = logoPaths[variant];
  const targetHref = href ?? defaultHrefs[variant];
  const dimensions = defaultDimensions[variant];

  const finalWidth = width ?? dimensions.width;
  const finalHeight = height ?? dimensions.height;

  const logoImage = (
    <Image
      src={logoSrc}
      alt={`WedyPlan ${variant.toUpperCase()} Logo`}
      width={finalWidth}
      height={finalHeight}
      // bg-transparent ve object-contain ile kesin şeffaflık ve taşmayan piksel kontrolü
      className={`bg-transparent w-auto h-auto object-contain ${dimensions.maxHClass} ${className}`}
      priority
    />
  );

  if (targetHref) {
    return (
      <Link href={targetHref} className="inline-flex items-center bg-transparent transition-opacity hover:opacity-85">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
}