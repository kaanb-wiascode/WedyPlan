import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  variant?: "default" | "vendor" | "admin" | "couple" | "main"; // 👈 "main" eklendi
  className?: string;
  width?: number;
  height?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "default",
  className = "",
  width = 140,
  height = 38,
}) => {
  const logoSrcMap = {
    default: "/assets/branding/logo-main.svg",
    main: "/assets/branding/logo-main.svg", // 👈 "main" eklendi
    vendor: "/assets/branding/logo-vendor.svg",
    admin: "/assets/branding/logo-admin.svg",
    couple: "/assets/branding/logo-couple.svg",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src={logoSrcMap[variant] || logoSrcMap.default}
        alt="WedyPlan Logo"
        width={width}
        height={height}
        priority
        className="h-9 w-auto object-contain"
      />
    </Link>
  );
};

export default BrandLogo;