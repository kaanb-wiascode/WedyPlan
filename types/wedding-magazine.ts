export interface MagazineAuthor {
    id: string;
    name: string;
    title: string;
    avatarUrl: string;
    bio: string;
    articleCount: number;
  }
  
  export interface MagazineCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
  }
  
  export interface EditorialGuide {
    id: string;
    title: string;
    subtitle: string;
    stepCount: number;
    coverUrl: string;
    slug: string;
  }
  
  export interface MagazineArticle {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    contentHtml?: string;
    coverImage: string;
    category: string;
    categorySlug: string;
    readTimeMinutes: number;
    publishedAt: string;
    author: MagazineAuthor;
    isFeatured?: boolean;
    isTrending?: boolean;
    tags: string[];
  }