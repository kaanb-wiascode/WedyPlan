export interface VendorPackage {
    id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
    isPopular?: boolean;
  }
  
  export interface VendorProfileData {
    id: string;
    companyName: string;
    category: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    coverImageUrl: string;
    galleryImages: string[];
    rating: number;
    reviewCount: number;
    packages: VendorPackage[];
  }