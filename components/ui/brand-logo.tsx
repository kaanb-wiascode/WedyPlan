import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  variant?: "default" | "vendor" | "admin" | "couple";
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "default",
  className = "",
}) => {
  // Pembe daireli eski logo kaldırıldı, yerine temanın şık ve modern SVG logoları bağlandı.
  const logoSrcMap = {
    default: "/assets/branding/logo-main.svg",
    vendor: "/assets/branding/logo-vendor.svg",
    admin: "/assets/branding/logo-admin.svg",
    couple: "/assets/branding/logo-couple.svg",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src={logoSrcMap[variant] || logoSrcMap.default}
        alt="WedyPlan Logo"
        width={140}
        height={38}
        priority
        className="h-9 w-auto object-contain"
      />
    </Link>
  );
};

export default BrandLogo;