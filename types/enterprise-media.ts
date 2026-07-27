export type MediaType = 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO' | 'ARCHIVE' | 'ASSET_3D';

export type StorageProviderType =
  | 'AMAZON_S3'
  | 'CLOUDFLARE_R2'
  | 'GOOGLE_CLOUD'
  | 'AZURE_BLOB'
  | 'LOCAL_DISK';

export type VirusScanStatus = 'PENDING' | 'CLEAN' | 'INFECTED' | 'SKIPPED';

export type AssetAccessLevel = 'PUBLIC' | 'PRIVATE' | 'RESTRICTED';

export interface PresignedUploadRequest {
  ownerId: string;
  fileName: string;
  mimeType: string;
  fileSizeBytes: number;
  folderId?: string;
  accessLevel?: AssetAccessLevel;
}

export interface PresignedUploadResponse {
  assetId: string;
  uploadUrl: string;
  storageKey: string;
  provider: StorageProviderType;
  expiresInSeconds: number;
}

export interface RegisterAssetRequest {
  assetId: string;
  ownerId: string;
  storageKey: string;
  originalFileName: string;
  mimeType: string;
  fileSizeBytes: number;
  folderId?: string;
  accessLevel?: AssetAccessLevel;
}

export interface ResponsiveVariants {
  thumbnail?: string;
  avif?: string;
  webp?: string;
  responsive?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

export interface MediaAssetDTO {
  id: string;
  ownerId: string;
  type: MediaType;
  fileName: string;
  mimeType: string;
  fileSizeBytes: number;
  cdnUrl: string;
  variants?: ResponsiveVariants;
  scanStatus: VirusScanStatus;
  createdAt: string;
}