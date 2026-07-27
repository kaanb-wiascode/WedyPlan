export interface CategoryArticle {
    id: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    readTime: string;
  }
  
  export interface CategoryPopularSearch {
    id: string;
    query: string;
    count: string;
  }
  
  export interface CategoryPageData {
    slug: string;
    title: string;
    subtitle: string;
    coverImage: string;
    icon: string;
    totalVendors: number;
    popularSearches: CategoryPopularSearch[];
    articles: CategoryArticle[];
    featuredVendors: {
      id: string;
      name: string;
      district: string;
      city: string;
      rating: number;
      reviewCount: number;
      startingPrice: number;
      imageUrl: string;
      isVerified: boolean;
    }[];
  }