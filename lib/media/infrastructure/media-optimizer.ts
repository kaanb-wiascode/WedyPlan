import { ResponsiveVariants } from '@/types/enterprise-media';

export class MediaOptimizer {
  /**
   * Generates AVIF, WebP and responsive image breakpoints
   */
  static async processImageVariants(cdnBaseUrl: string, storageKey: string): Promise<ResponsiveVariants> {
    const basePath = cdnBaseUrl.replace(/\/$/, '');

    return {
      thumbnail: `${basePath}/${storageKey}_thumb.webp`,
      avif: `${basePath}/${storageKey}.avif`,
      webp: `${basePath}/${storageKey}.webp`,
      responsive: {
        sm: `${basePath}/${storageKey}_640w.webp`,
        md: `${basePath}/${storageKey}_1024w.webp`,
        lg: `${basePath}/${storageKey}_1440w.webp`,
        xl: `${basePath}/${storageKey}_1920w.webp`
      }
    };
  }
}