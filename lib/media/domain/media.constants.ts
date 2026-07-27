import { MediaType } from '@/types/enterprise-media';

export const MEDIA_CONFIG = {
  MAX_FILE_SIZE_BYTES: 500 * 1024 * 1024, // 500 MB Max Single File Limit
  DEFAULT_QUOTA_BYTES: 10 * 1024 * 1024 * 1024, // 10 GB Default Quota
  PRESIGNED_URL_EXPIRATION_SEC: 900, // 15 Minutes

  RESPONSIVE_BREAKPOINTS: {
    sm: 640,
    md: 1024,
    lg: 1440,
    xl: 1920
  },

  MIME_TYPE_MAP: {
    // Images
    'image/jpeg': 'IMAGE',
    'image/png': 'IMAGE',
    'image/webp': 'IMAGE',
    'image/avif': 'IMAGE',
    'image/svg+xml': 'IMAGE',
    
    // Videos
    'video/mp4': 'VIDEO',
    'video/quicktime': 'VIDEO',
    'video/webm': 'VIDEO',
    
    // Documents
    'application/pdf': 'DOCUMENT',
    'application/msword': 'DOCUMENT',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCUMENT',
    'application/vnd.ms-excel': 'DOCUMENT',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'DOCUMENT',
    
    // Archives & Audio
    'application/zip': 'ARCHIVE',
    'audio/mpeg': 'AUDIO',
    'model/gltf-binary': 'ASSET_3D'
  } as Record<string, MediaType>
} as const;