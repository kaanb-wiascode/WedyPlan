import Image from "next/image";

export type PortalType = "couple" | "vendor" | "marketplace" | "admin" | "main";

interface BrandLogoProps {
  portal?: PortalType;
  variant?: "main" | "white" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BrandLogo({ 
  portal = "main", 
  variant = "main", 
  size = "md", 
  className = "" 
}: BrandLogoProps) {

  // Boyutlandırma Haritası
  const dimensions = {
    sm: { width: 130, height: 34 },
    md: { width: 170, height: 44 },
    lg: { width: 220, height: 58 },
  }[size];

  const iconDimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 56, height: 56 },
  }[size];

  // SVG Yolu Belirleme
  const getLogoPath = () => {
    if (variant === "icon") {
      return "/assets/branding/logo-icon.svg";
    }

    switch (portal) {
      case "couple":
        return "/assets/branding/logo-couple.svg";
      case "vendor":
        return "/assets/branding/logo-vendor.svg";
      case "marketplace":
        return "/assets/branding/logo-marketplace.svg";
      default:
        return "/assets/branding/logo-main.svg";
    }
  };

  const currentDimensions = variant === "icon" ? iconDimensions : dimensions;

  return (
    <div className={`relative flex items-center ${className}`}>
      <Image
        src={getLogoPath()}
        alt={`WedyPlan ${portal.toUpperCase()} OS`}
        width={currentDimensions.width}
        height={currentDimensions.height}
        priority
        className="object-contain cursor-pointer transition-all hover:opacity-90 h-9 w-auto"
      />
    </div>
  );
}