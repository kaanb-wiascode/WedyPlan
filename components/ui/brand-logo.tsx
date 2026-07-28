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

  // Genişlik ve Yükseklik Haritası
  const dimensions = {
    sm: { width: 130, height: 34 },
    md: { width: 170, height: 44 },
    lg: { width: 230, height: 60 },
  }[size];

  const iconDimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 56, height: 56 },
  }[size];

  // Portala ve Varyasyona Göre Logo Yolu Belirleme
  const getLogoPath = () => {
    // Eğer ikon isteniyorsa genel ikona veya porta ikonuna yönlendir
    if (variant === "icon") {
      return `/assets/branding/logo-icon.svg`;
    }

    // Beyaz / Koyu Zemin varyasyonu isteniyorsa
    if (variant === "white") {
      return portal === "main" 
        ? "/assets/branding/logo-white.svg" 
        : `/assets/branding/logo-${portal}-white.svg`;
    }

    // Portal logoları
    switch (portal) {
      case "couple":
        return "/assets/branding/logo-couple.svg";
      case "vendor":
        return "/assets/branding/logo-vendor.svg";
      case "marketplace":
        return "/assets/branding/logo-marketplace.svg";
      case "admin":
        return "/assets/branding/logo-admin.svg";
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
        className="object-contain cursor-pointer transition-all hover:opacity-90"
      />
    </div>
  );
}